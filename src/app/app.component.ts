import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  interval,
  map,
  Observable,
  Subject,
  takeUntil,
} from 'rxjs';
import { DemoService } from './demo-service';
import { UiModel } from './models';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  public data$: Observable<UiModel>;

  // public count$ = interval(1000);

  // public disabled$ = this.count$.pipe(map((i) => i < 5));

  private cancel$: Subject<void> = new Subject<void>();
  // private cancel$: Subject<void> = new BehaviorSubject<void>(null);

  constructor(private demoService: DemoService) {}

  public ngOnInit() {
    this.loadData();
  }

  public ngOnDestroy() {
    this.cancel$.next();
    this.cancel$.complete();
  }

  private loadData() {
    this.cancel$.next();
    this.data$ = combineLatest([
      this.demoService.get(1),
      this.demoService.get(2),
    ]).pipe(
      map(([response1, response2]) => new UiModel(response1, response2)),
      takeUntil(this.cancel$)
    );
  }
}
