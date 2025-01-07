import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { CurrencyState } from '../../shared/store/state/currency.state';
import { forkJoin, Observable } from 'rxjs';
import { Select2Data, Select2Module } from 'ng-select2-component';
import { DayInterval, Values } from '../../shared/interface/setting.interface';
import { SettingState } from '../../shared/store/state/setting.state';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDateStruct, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import * as media from '../../shared/data/media-config';
import * as data from '../../shared/data/time-zone';
import { NotificationService } from '../../shared/services/notification.service';
import { GetSettingOption, TestEmail, UpdateSettingOption } from '../../shared/store/action/setting.action';
import { GetCurrencies } from '../../shared/store/action/currency.action';
import { Attachment } from '../../shared/interface/attachment.interface';
import { ImageUploadComponent } from '../../shared/components/ui/image-upload/image-upload.component';
import { PageWrapperComponent } from '../../shared/components/page-wrapper/page-wrapper.component';
import { FormFieldsComponent } from '../../shared/components/ui/form-fields/form-fields.component';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../shared/components/ui/button/button.component';
import { HasPermissionDirective } from '../../shared/directive/has-permission.directive';

function convertToNgbDate(date: NgbDateStruct): NgbDate {
  return new NgbDate(date?.year, date?.month, date?.day);
}

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [ CommonModule, PageWrapperComponent, ImageUploadComponent, FormsModule, ReactiveFormsModule,
              FormFieldsComponent, TranslateModule, NgbModule, Select2Module, ButtonComponent, HasPermissionDirective],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.scss'
})
export class SettingComponent {

  @Select(CurrencyState.currencies) currency$: Observable<Select2Data>;
  @Select(SettingState.setting) setting$: Observable<Values>;
  
  public form: FormGroup;
  public active = 'general';
  public active_payment = 1;
  public time_zone = data.time_zone;
  public active_analytics = 'facebook';
  public mediaConfig = media.mediaConfig; 

  public hoveredDate: NgbDate | null = null;
	public fromDate: NgbDate | null;
	public toDate: NgbDate | null;
  
  public mail_mailer: Select2Data = [
    {
      value: 'sendmail',
      label: 'Sendmail',
    },
    {
      value: 'smtp',
      label: 'SMTP',
    },
    {
      value: 'mailgun',
      label: 'Mailgun',
    },
  ];
  
  public encryption: Select2Data = [
    {
      value: 'ssl',
      label: 'SSL',
    },
    {
      value: 'tls',
      label: 'TLS',
    }
  ];

  public language_direction: Select2Data = [
    {
      value: 'ltr',
      label: 'LTR',
    },
    {
      value: 'rtl',
      label: 'RTL',
    }
  ];

  public mode: Select2Data = [
    {
      value: 'light-only',
      label: 'Light',
    },
    {
      value: 'dark-only',
      label: 'Dark',
    }
  ];

  public mediaDisk: Select2Data = [
    {
      value: 'public',
      label: 'Local',
    },
    {
      value: 's3',
      label: 'AWS(s3)',
    }
  ];

  constructor(private store: Store,
    private formBuilder: FormBuilder,
    private calendar: NgbCalendar, 
    private notificationService: NotificationService,
    public formatter: NgbDateParserFormatter) { 
    this.form = formBuilder.group({
      general: new FormGroup({
        light_logo_image_id: new FormControl(),
        dark_logo_image_id: new FormControl(),
        tiny_logo_image_id: new FormControl(),
        favicon_image_id: new FormControl(),
        site_url: new FormControl(''),
        site_title: new FormControl('', Validators.required),
        site_name: new FormControl(''),
        site_tagline: new FormControl(),
        default_timezone: new FormControl('Asia/Kolkata', Validators.required),
        default_currency_id: new FormControl('', Validators.required),
        admin_site_language_direction: new FormControl('ltr'),
        min_order_amount: new FormControl(0 ,Validators.required),
        min_order_free_shipping: new FormControl(0 ,Validators.required),
        product_sku_prefix: new FormControl(),
        mode: new FormControl('light-only', Validators.required),
        copyright: new FormControl('Copyright Text Here'),
      }),
      activation: new FormGroup({
        multivendor: new FormControl(true),
        point_enable: new FormControl(true),
        coupon_enable: new FormControl(true),
        wallet_enable: new FormControl(true),
        stock_product_hide: new FormControl(true),
        store_auto_approve: new FormControl(true),
        product_auto_approve: new FormControl(true),
        guest_checkout: new FormControl(true),
        track_order: new FormControl(true),
        login_number: new FormControl(true),
        send_sms: new FormControl(true),
      }),
      wallet_points: new FormGroup({
        signup_points: new FormControl(100),
        min_per_order_amount: new FormControl(100),
        point_currency_ratio: new FormControl(30),
        reward_per_order_amount: new FormControl('')
      }),
      email: new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        mail_host: new FormControl(),
        mail_port: new FormControl(465),
        mail_mailer: new FormControl('smtp'),
        mail_password: new FormControl(),
        mail_username: new FormControl(),
        mail_encryption: new FormControl('ssl'),
        mail_from_name: new FormControl(),
        mail_from_address: new FormControl(),
        mailgun_domain: new FormControl(),
        mailgun_secret: new FormControl(),
        system_test_mail: new FormControl(true),
        password_reset_mail: new FormControl(true),
        visitor_inquiry_mail: new FormControl(true),
        cancel_order_mail: new FormControl(true),
        refund_request_mail: new FormControl(true),
        withdrawal_request_mail: new FormControl(true),
        pending_order_alert_mail: new FormControl(true),
        order_confirmation_mail: new FormControl(true),
        signup_welcome_mail: new FormControl(true),
        order_status_update_mail: new FormControl(true),
        refund_status_update_mail: new FormControl(true),
        withdrawal_status_update_mail: new FormControl(true),
        new_vendor_notification_mail: new FormControl(true),
      }),
      sms_methods: new FormGroup({
        default_sms_method: new FormControl('twillo'),
        twilio: new FormGroup({
          title: new FormControl(),
          status: new FormControl(false),
          twilio_sid: new FormControl(),
          twilio_auth_token: new FormControl(),
          twilio_number: new FormControl(),
        }),
        config: new FormGroup({
          cancel_order_sms: new FormControl(true),
          refund_request_sms: new FormControl(true),
          withdraw_request_sms: new FormControl(true),
          pending_order_sms: new FormControl(true),
          place_order_sms: new FormControl(true),
          signup_bonus_sms: new FormControl(true),
          update_order_status_sms: new FormControl(true),
          update_refund_request_sms: new FormControl(true),
          update_withdraw_request_sms: new FormControl(true),
          vendor_register_sms: new FormControl(true),
        })
      }),
      media_configuration: new FormGroup({
        media_disk: new FormControl('public'),
        aws_access_key_id: new FormControl(''),
        aws_secret_access_key: new FormControl(''),
        aws_bucket: new FormControl(''),
        aws_default_region: new FormControl('')
      }),
      vendor_commissions: new FormGroup({
        status: new FormControl(true),
        min_withdraw_amount: new FormControl(),
        default_commission_rate: new FormControl(),
        is_category_based_commission: new FormControl(true),
      }),
      refund: new FormGroup({
        status: new FormControl(true),
        refundable_days: new FormControl(),
      }),
      google_reCaptcha: new FormGroup({
        status: new FormControl(true),
        secret: new FormControl(),
        site_key: new FormControl(),
      }),
      delivery: new FormGroup({
        default_delivery: new FormControl(true),
        default: new FormGroup({
          title: new FormControl(),
          description: new FormControl()
        }),
        same_day_delivery: new FormControl(true),
        same_day: new FormGroup({
          title: new FormControl(),
          description: new FormControl()
        }),
        same_day_intervals: new FormArray([])
      }),
      payment_methods: new FormGroup({
        paypal: new FormGroup({
          status: new FormControl(true),
          title: new FormControl(),
          client_id: new FormControl(),
          client_secret: new FormControl(),
          sandbox_mode: new FormControl(true)
        }),
        stripe: new FormGroup({
          key: new FormControl(),
          title: new FormControl(),
          secret: new FormControl(),
          status: new FormControl(true)
        }),
        razorpay: new FormGroup({
          key: new FormControl(),
          title: new FormControl(),
          secret: new FormControl(),
          status: new FormControl(true)
        }),
        mollie: new FormGroup({
          status: new FormControl(true),
          title: new FormControl(),
          secret_key: new FormControl()
        }),
        phonepe: new FormGroup({
          status: new FormControl(true),
          title: new FormControl(),
          merchant_id: new FormControl(),
          salt_key: new FormControl(),
          salt_index: new FormControl(''),
          sandbox_mode: new FormControl(true)
        }),
        instamojo: new FormGroup({
          status: new FormControl(true),
          title: new FormControl(),
          client_id: new FormControl(),
          client_secret: new FormControl(),
          salt_key: new FormControl(),
          sandbox_mode: new FormControl(true)
        }),
        cod: new FormGroup({
          title: new FormControl(),
          status: new FormControl(true)
        }),
        ccavenue: new FormGroup({
          status: new FormControl(true),
          title: new FormControl(),
          merchant_id: new FormControl(),
          working_key: new FormControl(),
          access_code: new FormControl(),
          sandbox_mode: new FormControl(true)
        }),
        bkash: new FormGroup({
          status: new FormControl(true),
          title: new FormControl(),
          app_key: new FormControl(),
          app_secret: new FormControl(),
          username: new FormControl(),
          password: new FormControl(),
          sandbox_mode: new FormControl(true)
        }),
        flutter_wave: new FormGroup({
          status: new FormControl(true),
          title: new FormControl(),
          public_key: new FormControl(),
          secret_key: new FormControl(),
          secret_hash: new FormControl(),
          sandbox_mode: new FormControl(true)
        }),
        paystack: new FormGroup({
          status: new FormControl(true),
          title: new FormControl(),
          public_key: new FormControl(),
          secret_key: new FormControl(),
          sandbox_mode: new FormControl(true)
        }),
        sslcommerz: new FormGroup({
          status: new FormControl(true),
          title: new FormControl(),
          store_id: new FormControl(),
          store_password: new FormControl(),
          sandbox_mode: new FormControl(true)
        }),
        bank_transfer: new FormGroup({
          status: new FormControl(true),
          title: new FormControl()
        })
      }),
      analytics: new FormGroup({
        facebook_pixel: new FormGroup({
          status: new FormControl(true),
            pixel_id: new FormControl(),
        }),
        google_analytics: new FormGroup({
          status: new FormControl(true),
            measurement_id: new FormControl(),
        })
      }),
      maintenance: new FormGroup({
        title: new FormControl(),
        maintenance_mode: new FormControl(false),
        maintenance_image_id: new FormControl(),
        description: new FormControl(),
        start_date: new FormControl(),
        end_date: new FormControl(),
      })
    });
  }

  get sameDayIntervals(): FormArray {
    return (<any>this.form.controls['delivery']).controls['same_day_intervals']
  }

  ngOnInit() {
    const backendSettingOption$ = this.store.dispatch(new GetSettingOption());
    const getCurrencies$ = this.store.dispatch(new GetCurrencies({ status: 1 }));

    forkJoin([backendSettingOption$, getCurrencies$]).subscribe({
      complete: () => { 
        this.patchForm();
      }     
    });
  }

  patchForm() {
    this.store.select(SettingState.setting).subscribe(option => {
      this.fromDate = option?.maintenance?.start_date ? convertToNgbDate(this.formatter.parse(option?.maintenance?.start_date)!) : null;
      this.toDate = option?.maintenance?.end_date ? convertToNgbDate(this.formatter.parse(option?.maintenance?.end_date)!) : null;
      this.form.patchValue({
        general: {
          light_logo_image_id: option?.general?.light_logo_image_id,
          dark_logo_image_id: option?.general?.dark_logo_image_id,
          favicon_image_id: option?.general?.favicon_image_id,
          tiny_logo_image_id: option?.general?.tiny_logo_image_id,
          site_name: option?.general?.site_name,
          site_url: option?.general?.site_url,
          site_title: option?.general?.site_title,
          site_tagline: option?.general?.site_tagline,
          default_timezone: option?.general?.default_timezone,
          default_currency_id: +option?.general?.default_currency_id!,
          admin_site_language_direction: option?.general?.admin_site_language_direction,
          min_order_amount: option?.general?.min_order_amount,
          min_order_free_shipping: option?.general?.min_order_free_shipping,
          product_sku_prefix: option?.general?.product_sku_prefix,
          mode: option?.general?.mode, 
          copyright: option?.general?.copyright
        },
        activation: {
          multivendor: option?.activation?.multivendor,
          point_enable: option?.activation?.point_enable,
          coupon_enable: option?.activation?.coupon_enable,
          wallet_enable: option?.activation?.wallet_enable,
          stock_product_hide: option?.activation?.stock_product_hide,
          store_auto_approve: option?.activation?.store_auto_approve,
          product_auto_approve: option?.activation?.product_auto_approve,
          guest_checkout: option?.activation?.guest_checkout,
          track_order: option?.activation?.track_order,
          login_number: option?.activation?.track_order,
          send_sms: option?.activation?.send_sms,
        },
        wallet_points: {
          signup_points: option?.wallet_points?.signup_points,
          min_per_order_amount: option?.wallet_points?.min_per_order_amount,
          point_currency_ratio: option?.wallet_points?.point_currency_ratio,
          reward_per_order_amount: option?.wallet_points?.reward_per_order_amount,
        },
        email: {
          email: option?.email?.email,
          mail_host: option?.email?.mail_host,
          mail_port: option?.email?.mail_port,
          mail_mailer: option?.email?.mail_mailer,
          mail_password: option?.email?.mail_password,
          mail_username: option?.email?.mail_username,
          mail_encryption: option?.email?.mail_encryption,
          mail_from_name: option?.email?.mail_from_name,
          mail_from_address: option?.email?.mail_from_address,
          mailgun_domain: option?.email?.mailgun_domain,
          mailgun_secret: option?.email?.mailgun_secret,
          system_test_mail: option?.email?.system_test_mail,
          password_reset_mail: option?.email?.password_reset_mail,
          visitor_inquiry_mail: option?.email?.visitor_inquiry_mail,
          cancel_order_mail: option?.email?.cancel_order_mail,
          refund_request_mail: option?.email?.refund_request_mail,
          withdrawal_request_mail: option?.email?.withdrawal_request_mail,
          pending_order_alert_mail: option?.email?.pending_order_alert_mail,
          order_confirmation_mail: option?.email?.order_confirmation_mail,
          signup_welcome_mail: option?.email?.signup_welcome_mail,
          order_status_update_mail: option?.email?.order_status_update_mail,
          refund_status_update_mail: option?.email?.refund_status_update_mail,
          withdrawal_status_update_mail: option?.email?.withdrawal_status_update_mail,
          new_vendor_notification_mail: option?.email?.new_vendor_notification_mail,
        },
        sms_methods: {
          default_sms_method: option?.sms_methods?.default_sms_method,
          twilio: {
            title: option?.sms_methods?.twilio?.title,
            status: option?.sms_methods?.twilio?.status,
            twilio_sid: option?.sms_methods?.twilio?.twilio_sid,
            twilio_auth_token: option?.sms_methods?.twilio?.twilio_auth_token,
            twilio_number: option?.sms_methods?.twilio?.twilio_number,
          },
          config: {
            cancel_order_sms: option?.sms_methods?.config?.cancel_order_sms,
            refund_request_sms: option?.sms_methods?.config?.refund_request_sms,
            withdraw_request_sms: option?.sms_methods?.config?.withdraw_request_sms,
            pending_order_sms: option?.sms_methods?.config?.pending_order_sms,
            place_order_sms: option?.sms_methods?.config?.place_order_sms,
            signup_bonus_sms: option?.sms_methods?.config?.signup_bonus_sms,
            update_order_status_sms: option?.sms_methods?.config?.update_order_status_sms,
            update_refund_request_sms: option?.sms_methods?.config?.update_refund_request_sms,
            update_withdraw_request_sms: option?.sms_methods?.config?.update_withdraw_request_sms,
            vendor_register_sms: option?.sms_methods?.config?.vendor_register_sms,
          },
        },
        media_configuration: {
          media_disk: option?.media_configuration?.media_disk,
          aws_access_key_id: option?.media_configuration?.aws_access_key_id,
          aws_secret_access_key: option?.media_configuration?.aws_secret_access_key,
          aws_bucket: option?.media_configuration?.aws_bucket,
          aws_default_region: option?.media_configuration?.aws_default_region
        },
        vendor_commissions: {
          status: option?.vendor_commissions?.status,
          min_withdraw_amount: option?.vendor_commissions?.min_withdraw_amount,
          default_commission_rate: option?.vendor_commissions?.default_commission_rate,
          is_category_based_commission: option?.vendor_commissions?.is_category_based_commission,
        },
        refund: {
          status: option?.refund?.status,
          refundable_days: option?.refund?.refundable_days,
        },
        google_reCaptcha: {
          status: option?.google_reCaptcha?.status,
          secret: option?.google_reCaptcha?.secret,
          site_key: option?.google_reCaptcha?.site_key,
        },
        delivery: {
          default_delivery: 1,
          default: {
            title: option?.delivery?.default?.title,
            description: option?.delivery?.default?.description
          },
          same_day_delivery: option?.delivery?.same_day_delivery,
          same_day: {
            title: option?.delivery?.same_day?.title,
            description: option?.delivery?.same_day?.description
          }
        },
        payment_methods: {
          paypal: {
            status: option?.payment_methods?.paypal?.status,
            title: option?.payment_methods?.paypal?.title,
            client_id: option?.payment_methods?.paypal?.client_id,
            client_secret: option?.payment_methods?.paypal?.client_secret,
            sandbox_mode: option?.payment_methods?.paypal?.sandbox_mode,
          },
          stripe: {
            key: option?.payment_methods?.stripe?.key,
            title: option?.payment_methods?.stripe?.title,
            secret: option?.payment_methods?.stripe?.secret,
            status: option?.payment_methods?.stripe?.status,
          },
          razorpay: {
            key: option?.payment_methods?.razorpay?.key,
            title: option?.payment_methods?.razorpay?.title,
            secret: option?.payment_methods?.razorpay?.secret,
            status: option?.payment_methods?.razorpay?.status,
          },
          mollie: {
            status: option?.payment_methods?.mollie?.status, 
            title: option?.payment_methods?.mollie?.title,
            secret_key: option?.payment_methods?.mollie?.secret_key, 
          },
          phonepe: {
            status: option?.payment_methods?.phonepe?.status, 
            title: option?.payment_methods?.phonepe?.title, 
            merchant_id: option?.payment_methods?.phonepe?.merchant_id, 
            salt_Key: option?.payment_methods?.phonepe?.merchant_id, 
            salt_index: option?.payment_methods?.phonepe?.salt_index, 
            sandbox_mode: option?.payment_methods?.phonepe?.sandbox_mode, 
          },
          instamojo: {
            status: option?.payment_methods?.instamojo?.status, 
            title: option?.payment_methods?.instamojo?.title, 
            client_id: option?.payment_methods?.instamojo?.client_id, 
            client_secret: option?.payment_methods?.instamojo?.client_secret, 
            salt_key: option?.payment_methods?.instamojo?.salt_key, 
            sandbox_mode: option?.payment_methods?.instamojo?.sandbox_mode, 
          },
          cod: {
            status: option?.payment_methods?.cod?.status,
            title: option?.payment_methods?.cod?.title, 
          },
          ccavenue: {
            status: option?.payment_methods?.ccavenue?.status, 
            title: option?.payment_methods?.ccavenue?.title, 
            merchant_id: option?.payment_methods?.ccavenue?.merchant_id, 
            working_key: option?.payment_methods?.ccavenue?.working_key, 
            access_code: option?.payment_methods?.ccavenue?.access_code, 
            sandbox_mode: option?.payment_methods?.ccavenue?.sandbox_mode, 
          },
          bkash: {
            status: option?.payment_methods?.bkash?.status, 
            title: option?.payment_methods?.bkash?.title, 
            app_key: option?.payment_methods?.bkash?.app_key, 
            app_secret: option?.payment_methods?.bkash?.app_secret, 
            username: option?.payment_methods?.bkash?.username, 
            password: option?.payment_methods?.bkash?.password, 
            sandbox_mode: option?.payment_methods?.bkash?.sandbox_mode, 
          },
          flutter_wave: {
            status: option?.payment_methods?.flutter_wave?.status, 
            title: option?.payment_methods?.flutter_wave?.title, 
            public_key: option?.payment_methods?.flutter_wave?.public_key, 
            secret_key: option?.payment_methods?.flutter_wave?.secret_key, 
            secret_hash: option?.payment_methods?.flutter_wave?.secret_hash, 
            sandbox_mode: option?.payment_methods?.flutter_wave?.sandbox_mode, 
          },
          paystack: {
            status: option?.payment_methods?.paystack?.status, 
            title: option?.payment_methods?.paystack?.title, 
            public_key: option?.payment_methods?.paystack?.public_key, 
            secret_key: option?.payment_methods?.paystack?.secret_key, 
            sandbox_mode: option?.payment_methods?.paystack?.sandbox_mode, 
          },
          sslcommerz: {
            status: option?.payment_methods?.sslcommerz?.status, 
            title: option?.payment_methods?.sslcommerz?.title, 
            store_id: option?.payment_methods?.sslcommerz?.store_id, 
            store_password: option?.payment_methods?.sslcommerz?.store_password, 
            sandbox_mode: option?.payment_methods?.sslcommerz?.sandbox_mode, 
          },
          bank_transfer: {
            status: option?.payment_methods?.bank_transfer?.status, 
            title: option?.payment_methods?.bank_transfer?.title
          },
        },
        analytics: {
          facebook_pixel: {
            status: option?.analytics?.facebook_pixel?.status,
              pixel_id: option?.analytics?.facebook_pixel?.pixel_id,
          },
          google_analytics:{
            status: option?.analytics?.google_analytics?.status,
              measurement_id: option?.analytics?.google_analytics?.measurement_id,
          }
        },
        maintenance: {
          title: option?.maintenance?.title,
          maintenance_mode: option?.maintenance?.maintenance_mode,
          maintenance_image_id: option?.maintenance?.maintenance_image_id,
          description: option?.maintenance?.description,
          end_date: option?.maintenance?.end_date,
        }
      });
      this.sameDayIntervals.clear();
      option?.delivery?.same_day_intervals?.forEach((delivery: DayInterval) => 
        this.sameDayIntervals.push(
          this.formBuilder.group({
            title: new FormControl(delivery?.title),
            description: new FormControl(delivery?.description)
          })
      ));
    });
  }


  getFieldClass(control: any): string {
    return control.invalid ? 'is-invalid' : '';
  }

  
  selectLightLogo(data: Attachment) {
    if(!Array.isArray(data)) {
      (<FormGroup>this.form.controls['general']).controls['light_logo_image_id'].setValue(data ? data?.id : null);
    }
  }

  selectDarkLogo(data: Attachment) {
    if(!Array.isArray(data)) {
      (<FormGroup>this.form.controls['general']).controls['dark_logo_image_id'].setValue(data ? data?.id : null);
    }
  }

  selectTinyLogo(data: Attachment) {
    if(!Array.isArray(data)) {
      (<FormGroup>this.form.controls['general']).controls['tiny_logo_image_id'].setValue(data ? data?.id : null);
    }
  }

  selectFavicon(data: Attachment) {
    if(!Array.isArray(data)) {
      (<FormGroup>this.form.controls['general']).controls['favicon_image_id'].setValue(data ? data?.id : null);
    }
  }

  selectMaintenance(data: Attachment) {
    if(!Array.isArray(data)) {
      (<FormGroup>this.form.controls['maintenance']).controls['maintenance_image_id'].setValue(data ? data?.id : null);
    }
  }

  addDays(event: Event) {
    event.preventDefault();
    this.sameDayIntervals.push(
      this.formBuilder.group({
        title: new FormControl(),
        description: new FormControl()
      })
    );
  }

  remove(index: number) {
    if(this.sameDayIntervals.length <= 1) return
      this.sameDayIntervals.removeAt(index);
  }


  // For Date Picker
  onDateSelection(date: NgbDate) {
		if (!this.fromDate && !this.toDate) {
			this.fromDate = date;
		} else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
			this.toDate = date;
		} else {
			this.toDate = null;
			this.fromDate = date;
		}
     
    (<FormGroup>this.form.controls['maintenance']).controls['start_date'].setValue(`${this.fromDate.year}-${this.fromDate.month}-${this.fromDate.day}`);
    (<FormGroup>this.form.controls['maintenance']).controls['end_date'].setValue(`${this.toDate?.year}-${this.toDate?.month}-${this.toDate?.day}`);
	}

  isHovered(date: NgbDate) {
		return (
			this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
		);
	}


	isInside(date: NgbDate) {
		return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
	}

	isRange(date: NgbDate) {
		return (
			date.equals(this.fromDate) ||
			(this.toDate && date.equals(this.toDate)) ||
			this.isInside(date) ||
			this.isHovered(date)
		);
	}

	validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
		const parsed = this.formatter.parse(input);
		return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
	}

  clearDateRange() {
    this.fromDate = null;
    this.toDate = null;
  }

  mailSubmit(){
    this.form.markAllAsTouched();
    if(this.form.get('email.email')?.value){
      this.store.dispatch(new TestEmail(this.form.get('email')?.value)).subscribe({
          complete: () => {
          this.form.get('email.email')?.removeValidators([Validators.required, Validators.email]);
          this.notificationService.showSuccess(`Test mail send to ${this.form.get('email.email')?.value}`);
        }
      });
    }
  }

  submit() {
    (this.form.get('email') as FormGroup).removeControl('email');
    this.form.markAllAsTouched();
    if(this.form.valid) {
      this.store.dispatch(new UpdateSettingOption({values: this.form.value}));
    }
  }
}
