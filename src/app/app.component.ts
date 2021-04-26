import { HashLocationStrategy } from "@angular/common";
import { ChangeDetectionStrategy, Component, VERSION } from "@angular/core";
import { combineLatest, fromEvent, of, Subject, timer } from "rxjs";
import { combineAll, filter, map, startWith, take, tap } from "rxjs/operators";

const log = console.log;

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  documentClickedAction = new Subject<number>();
  documentClickedAction$ = this.documentClickedAction.asObservable();

  delayedNumbers$ = timer(0, 1000).pipe(
    take(5),
    map(v => v + 2)
  );

  delayedAlpha$ = timer(0, 1000).pipe(
    take(5),
    map(v => String.fromCharCode(v + 65))
  );

  numbers$ = of(1, 2, 3, 4, 5);
  documentClick$ = fromEvent(document, "click");

  example$ = this.delayedNumbers$.pipe(map(n => this.delayedNumbers$));

  constructor() {
    this.example$
    .pipe(
      combineAll()
    )
    .subscribe({
      next:log,
      complete:()=>{log(`example$ completes`)}
    });
  }

  // timeAndClicks$ = combineLatest([
  //   this.documentClick$,
  //   this.delayedNumbers$
  // ]).pipe(map(([click, numera]) => ({ click, numera })));

  // delayedNumbersEven$ = this.delayedNumbers$.pipe(filter(v => v % 2 === 0));
  // delayedNumbersOdd$ = this.delayedNumbers$.pipe(filter(v => v % 2 !== 0));
}
