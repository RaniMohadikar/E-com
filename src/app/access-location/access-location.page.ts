import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface SavedAddress {
  label: string;
  address: string;
  lat: number;
  lon: number;
}

@Component({
  selector: 'app-access-location',
  templateUrl: './access-location.page.html',
  styleUrls: ['./access-location.page.scss'],
})
export class AccessLocationPage implements OnInit {

  state: 'idle' | 'loading' | 'success' | 'denied' = 'idle';

  lat: number | null = null;
  lon: number | null = null;
  mapUrl: SafeResourceUrl | null = null;

  fullAddress   = '';
  city          = '';
  state_region  = '';
  country       = '';
  pincode       = '';
  displayAddr   = '';

  searchQuery   = '';
  searchResults: any[] = [];
  isSearching   = false;

  savedAddresses: SavedAddress[] = [];

  private readonly LOCATION_KEY = 'SAVED_LOCATION';

  constructor(
    private sanitizer: DomSanitizer,
    private router: Router,
    private toastCtrl: ToastController,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // Load previously saved location
    const saved = localStorage.getItem(this.LOCATION_KEY);
    if (saved) {
      const loc: SavedAddress = JSON.parse(saved);
      this.savedAddresses = [loc];
      this.lat = loc.lat;
      this.lon = loc.lon;
      this.displayAddr = loc.address;
      this.buildMap(loc.lat, loc.lon);
      this.state = 'success';
    }
  }

  /* ─────────────── GPS Detection ─────────────── */
  detectLocation() {
    if (!navigator.geolocation) {
      this.showToast('Geolocation not supported by this browser', 'warning');
      return;
    }
    this.state = 'loading';
    this.cdr.detectChanges();

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        this.lat = pos.coords.latitude;
        this.lon = pos.coords.longitude;
        this.buildMap(this.lat, this.lon);
        this.reverseGeocode(this.lat, this.lon);
      },
      (err) => {
        this.state = 'denied';
        this.cdr.detectChanges();
        this.showToast('Location access denied. Please allow it in browser settings.', 'danger');
      },
      { timeout: 10000, maximumAge: 0, enableHighAccuracy: true }
    );
  }

  /* ─────────────── Build Map iframe URL ─────────────── */
  buildMap(lat: number, lon: number) {
    const delta = 0.012;
    const url = `https://www.openstreetmap.org/export/embed.html`
      + `?bbox=${lon - delta},${lat - delta},${lon + delta},${lat + delta}`
      + `&layer=mapnik&marker=${lat},${lon}`;
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    this.cdr.detectChanges();
  }

  /* ─────────────── Reverse Geocoding ─────────────── */
  reverseGeocode(lat: number, lon: number) {
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`)
      .then(r => r.json())
      .then((data: any) => {
        const a = data.address || {};
        this.fullAddress  = data.display_name || '';
        this.city         = a.city || a.town || a.village || a.county || '';
        this.state_region = a.state || '';
        this.country      = a.country || '';
        this.pincode      = a.postcode || '';
        this.displayAddr  = [
          a.road || a.suburb || a.neighbourhood || '',
          this.city,
          this.state_region,
          this.pincode
        ].filter(Boolean).join(', ');
        this.state = 'success';
        this.cdr.detectChanges();
      })
      .catch(() => {
        this.displayAddr = `${lat.toFixed(4)}, ${lon.toFixed(4)}`;
        this.state = 'success';
        this.cdr.detectChanges();
      });
  }

  /* ─────────────── Address Search ─────────────── */
  async onSearch(event: any) {
    const q = event.target?.value?.trim() || '';
    this.searchQuery = q;
    if (q.length < 3) { this.searchResults = []; this.isSearching = false; return; }

    this.isSearching = true;
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&limit=5`
      );
      this.searchResults = await res.json();
    } catch {
      this.searchResults = [];
    }
    this.cdr.detectChanges();
  }

  selectSearchResult(result: any) {
    this.lat = parseFloat(result.lat);
    this.lon = parseFloat(result.lon);
    this.displayAddr  = result.display_name;
    this.fullAddress  = result.display_name;
    this.searchResults = [];
    this.isSearching = false;
    this.buildMap(this.lat, this.lon);
    this.reverseGeocode(this.lat, this.lon);
  }

  /* ─────────────── Save & Use Location ─────────────── */
  useThisLocation() {
    if (!this.lat || !this.lon) return;
    const addr: SavedAddress = {
      label: 'Current Location',
      address: this.displayAddr,
      lat: this.lat,
      lon: this.lon
    };
    localStorage.setItem(this.LOCATION_KEY, JSON.stringify(addr));
    this.savedAddresses = [addr];
    this.showToast('Location saved successfully!', 'success');
    setTimeout(() => this.router.navigateByUrl('/tabs/tab1', { replaceUrl: false }), 1200);
  }

  openInMaps() {
    if (this.lat && this.lon) {
      window.open(`https://www.openstreetmap.org/?mlat=${this.lat}&mlon=${this.lon}#map=16/${this.lat}/${this.lon}`, '_blank');
    }
  }

  private async showToast(message: string, color: string) {
    const t = await this.toastCtrl.create({ message, duration: 2500, color, position: 'bottom' });
    await t.present();
  }
}
