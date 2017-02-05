import { Component, Input, OnInit } from '@angular/core';

import { ScoreService } from './../shared/services/score.service';
import { RecordScore } from './../shared/models/index';

@Component({
  selector: 'tate-score',
  moduleId: module.id,
  templateUrl: 'score.template.html',
  styleUrls: ['score.component.css']
})
export class ScoreComponent implements OnInit {
  @Input() username: string;
  scoreSubscription: any;
  score: RecordScore[];

  constructor(private scoreService: ScoreService) {
  }


  ngOnInit() {
    this.scoreSubscription = this.scoreService.getScoreSubscription();

    // if we are displaying info related to only one person
    if(this.username) {
      this.scoreSubscription = this.scoreSubscription.map((score:RecordScore[])=> {
        let userRecord: RecordScore[] = score.filter((record: RecordScore)=>  record.username ===  this.username);
        if(!userRecord.length) {
          userRecord.push(this.scoreService.getEmptyRecord(this.username));
        }
        return userRecord;
      });
    }

    this.scoreSubscription.subscribe((score: RecordScore[])=> {
      this.onScoreUpdate(score);
    });

  }

  private onScoreUpdate(score: RecordScore[]) {
    this.score = score;
  }

}

