import { Component } from '@angular/core';
import { AppService } from './app.service';
import { interval } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  color = 'primary';
  mode = 'determinate';
  value = 0;
  count = 0;
  private subscription: any;

  constructor(private service: AppService) {

  }

  loadData() {
    this.count = data.images.length + 1;
    this.service.sendData(data)
      .subscribe(key => {
        this.pollingRestApi(key);
        this.value = 0;
      });
  }

  pollingRestApi(key: string) {
    this.subscription = interval(500)
      .pipe(
        startWith(0),
        switchMap(() => this.service.getStatus(key)))
      .subscribe(res => {
        this.value = (res.result / this.count) * 100;
        if (this.value >= 100) {
          this.subscription.unsubscribe();
        }
      });
  }


}

const data: { images: string[], propertyInfo: string } = {
  propertyInfo: 'https://storage.googleapis.com/stoa-fetch/info.json',
  images: [
    'https://storage.googleapis.com/stoa-images-staging/properties/0c31571d-8eda-4a70-8503-f5fa0f885de8/01981d29e35cf65044364098050af429.jpg',
    'https://storage.googleapis.com/stoa-images-staging/properties/0c31571d-8eda-4a70-8503-f5fa0f885de8/01981d29e35cf65044364098050af429_1.jpg',
    'https://storage.googleapis.com/stoa-images-staging/properties/0c31571d-8eda-4a70-8503-f5fa0f885de8/01981d29e35cf65044364098050af429_2.jpg',
    'https://storage.googleapis.com/stoa-images-staging/properties/0c31571d-8eda-4a70-8503-f5fa0f885de8/01981d29e35cf65044364098050af429_3.jpg',
    'https://storage.googleapis.com/stoa-images-staging/properties/0c31571d-8eda-4a70-8503-f5fa0f885de8/01981d29e35cf65044364098050af429_4.jpg',
    'https://storage.googleapis.com/stoa-images-staging/properties/01981d29e35cf65044364098050af429/gg01981d29e35cf65044364098050af429.jpeg',
    'https://storage.googleapis.com/stoa-images-staging/properties/0c31571d-8eda-4a70-8503-f5fa0f885de8/40a8f3222d31ed48149f4a758375f202.jpg',
    'https://storage.googleapis.com/stoa-images-staging/properties/0c31571d-8eda-4a70-8503-f5fa0f885de8/40a8f3222d31ed48149f4a758375f202_1.jpg',
    'https://storage.googleapis.com/stoa-images-staging/properties/0c31571d-8eda-4a70-8503-f5fa0f885de8/40a8f3222d31ed48149f4a758375f202_2.jpg',
    'https://storage.googleapis.com/stoa-images-staging/properties/0c31571d-8eda-4a70-8503-f5fa0f885de8/40a8f3222d31ed48149f4a758375f202_3.jpg',
    'https://storage.googleapis.com/stoa-images-staging/properties/0c31571d-8eda-4a70-8503-f5fa0f885de8/40a8f3222d31ed48149f4a758375f202_4.jpg',
    'https://storage.googleapis.com/stoa-images-staging/properties/40a8f3222d31ed48149f4a758375f202/gg40a8f3222d31ed48149f4a758375f202.jpeg',
    'https://storage.googleapis.com/stoa-images-staging/properties/0c31571d-8eda-4a70-8503-f5fa0f885de8/4c4537d33651e51d2c75d630da6401cd.jpg',
    'https://storage.googleapis.com/stoa-images-staging/properties/0c31571d-8eda-4a70-8503-f5fa0f885de8/4c4537d33651e51d2c75d630da6401cd_1.jpg',
    'https://storage.googleapis.com/stoa-images-staging/properties/0c31571d-8eda-4a70-8503-f5fa0f885de8/4c4537d33651e51d2c75d630da6401cd_2.jpg',
    'https://storage.googleapis.com/stoa-images-staging/properties/0c31571d-8eda-4a70-8503-f5fa0f885de8/4c4537d33651e51d2c75d630da6401cd_3.jpg',
    'https://storage.googleapis.com/stoa-images-staging/properties/0c31571d-8eda-4a70-8503-f5fa0f885de8/4c4537d33651e51d2c75d630da6401cd_4.jpg',
    'https://storage.googleapis.com/stoa-images-staging/properties/4c4537d33651e51d2c75d630da6401cd/gg4c4537d33651e51d2c75d630da6401cd.jpeg',
    'https://storage.googleapis.com/stoa-images-staging/properties/0c31571d-8eda-4a70-8503-f5fa0f885de8/71738114bcc93961db52835912360f8d.jpg',
    'https://storage.googleapis.com/stoa-images-staging/properties/0c31571d-8eda-4a70-8503-f5fa0f885de8/71738114bcc93961db52835912360f8d_1.jpg',
    'https://storage.googleapis.com/stoa-images-staging/properties/0c31571d-8eda-4a70-8503-f5fa0f885de8/71738114bcc93961db52835912360f8d_2.jpg',
    'https://storage.googleapis.com/stoa-images-staging/properties/0c31571d-8eda-4a70-8503-f5fa0f885de8/71738114bcc93961db52835912360f8d_3.jpg',
    'https://storage.googleapis.com/stoa-images-staging/properties/0c31571d-8eda-4a70-8503-f5fa0f885de8/71738114bcc93961db52835912360f8d_4.jpg',
    'https://storage.googleapis.com/stoa-images-staging/properties/71738114bcc93961db52835912360f8d/gg71738114bcc93961db52835912360f8d.jpeg'
  ]
};
