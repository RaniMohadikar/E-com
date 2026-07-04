import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  notifications = [
    { title: 'Order Shipped!', desc: 'Your order #123456 has been shipped.', icon: 'car-outline', bg: '#e8f4fd', color: '#1a73e8', time: '2 min ago' },
    { title: 'Flash Deal Alert!', desc: 'Up to 60% off on Electronics. Limited time!', icon: 'pricetag-outline', bg: '#fff0e6', color: '#FF6B02', time: '1 hr ago' },
    { title: 'Payment Successful', desc: 'Payment of ₹3,583 received for order #123455.', icon: 'checkmark-circle-outline', bg: '#e8fde8', color: '#2dd36f', time: '3 hrs ago' },
    { title: 'New Coupon Added', desc: 'Use code SAVE100 to get ₹100 off.', icon: 'ticket-outline', bg: '#fdf4e8', color: '#c09a00', time: '5 hrs ago' },
    { title: 'Order Delivered', desc: 'Order #123454 has been delivered successfully.', icon: 'bag-check-outline', bg: '#e8fde8', color: '#2dd36f', time: '1 day ago' },
    { title: 'Review Request', desc: 'How was your boAt Rockerz 450? Rate it now.', icon: 'star-outline', bg: '#fde8e8', color: '#eb445a', time: '2 days ago' },
  ];

  constructor() {}
  ngOnInit() {}
}
