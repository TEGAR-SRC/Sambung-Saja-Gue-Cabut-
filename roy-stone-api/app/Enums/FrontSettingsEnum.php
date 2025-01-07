<?php

namespace App\Enums;

enum FrontSettingsEnum:string {
  case GENERAL = 'general';
  case ANALYTICS = 'analytics';
  case ACTIVATION = 'activation';
  case MAINTENANCE = 'maintenance';
  case DELIVERY = 'delivery';
  case WALLET_POINTS = 'wallet_points';
  case GOOGLE_RECAPTCHA = 'google_reCaptcha';
  case NEWSLETTER = 'newsletter';
}
