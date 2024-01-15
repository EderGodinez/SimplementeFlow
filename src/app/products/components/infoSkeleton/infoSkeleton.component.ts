import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'info-skeleton',
  standalone: true,
  imports: [
    CommonModule,
    SkeletonModule
  ],
  template:`
  <div class="grid">
  <div class="sm:col-12 md:col-12 xl:col-6">
    <div class="card">
    <p-skeleton height="50vh"></p-skeleton>
  </div>
 </div>
 <div class="sm:col-12 md:col-12 xl:col-6">
  <div class="p-2 flex w-full justify-content-between my-3" id="infoP">
  <p-skeleton height="1rem" styleClass="mb-2"></p-skeleton>
    <p-skeleton height="2rem" styleClass="mb-2"></p-skeleton>
    <p-skeleton shape="circle" size="3rem" styleClass=""></p-skeleton>
  </div>
  <div class="p-2" id="sizes">
    <ul class="flex gap-4 p-0 flex-wrap justify-content-start text-center vertical-align-middle">
    <p-skeleton *ngFor="let item of [1,2,3] | keyvalue" width="8rem" height="4rem"></p-skeleton>
    </ul>
  </div>

  <div class="p-2">
    <p-skeleton *ngFor="let item of [0,1,2,3]" height="4rem" styleClass="mb-2 "></p-skeleton>
  </div>
</div>
</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoSkeletonComponent {

 }
