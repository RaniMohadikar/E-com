import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ToastController, ActionSheetController } from '@ionic/angular';
import { AuthService, User } from '../services/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  user: User | null = null;

  fullName = '';
  email    = '';
  phone    = '';
  photo    = '';

  isSaving = false;

  constructor(
    private authService: AuthService,
    private location: Location,
    private toastCtrl: ToastController,
    private actionSheetCtrl: ActionSheetController
  ) {}

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
    if (this.user) {
      this.fullName = this.user.fullName  || '';
      this.email    = this.user.email     || '';
      this.phone    = this.user.phone     || '';
      this.photo    = this.user.photo     || '';
    }
  }

  /* ── Photo picker ── */
  async pickPhoto() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Profile Photo',
      buttons: [
        {
          text: 'Choose from Gallery',
          icon: 'images-outline',
          handler: () => { this.triggerFileInput(); }
        },
        {
          text: 'Remove Photo',
          icon: 'trash-outline',
          role: 'destructive',
          handler: () => { this.photo = ''; }
        },
        { text: 'Cancel', icon: 'close', role: 'cancel' }
      ]
    });
    await actionSheet.present();
  }

  triggerFileInput() {
    const input = document.getElementById('photo-input') as HTMLInputElement;
    if (input) input.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file  = input.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.photo = e.target.result as string;
    };
    reader.readAsDataURL(file);
  }

  /* ── Save ── */
  async saveProfile() {
    if (!this.fullName.trim()) {
      await this.showToast('Name cannot be empty', 'warning');
      return;
    }

    this.isSaving = true;

    this.authService.updateProfile({
      fullName: this.fullName.trim(),
      email:    this.email.trim(),
      phone:    this.phone.trim(),
      photo:    this.photo,
    });

    await this.showToast('Profile updated successfully!', 'success');
    this.isSaving = false;

    // Go back — this properly triggers ionViewWillEnter on account page
    this.location.back();
  }

  private async showToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color,
      position: 'bottom'
    });
    await toast.present();
  }
}
