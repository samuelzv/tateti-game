import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Winner } from './../constants';
import { RecordScore } from './../models/record-score.model';
import { StorageService } from './storage.service';

const SCORE_KEY = 'score';

@Injectable()
export class ScoreService {
  score: RecordScore[];
  subject: BehaviorSubject<RecordScore[]>;

  constructor(private storageService: StorageService) {
    this.score  = this.getScore();
    this.subject = new BehaviorSubject(this.score);
  }

  public getScoreSubscription(): BehaviorSubject<RecordScore[]> {
    return this.subject;
  }

  private publishChanges() {
    return this.subject.next(this.score);
  }

  public increment(username: string, winner: Winner) {
    let userRecord = this.getUserRecord(username);

    if (!userRecord) {
      userRecord = this.getEmptyRecord(username);
      this.score.push(userRecord);
    }

    userRecord.won  = winner === Winner.PERSON ? userRecord.won + 1 : userRecord.won;
    userRecord.lost = winner === Winner.COMPUTER ? userRecord.lost + 1 : userRecord.lost;
    userRecord.tied = winner === Winner.TIE ? userRecord.tied + 1 : userRecord.tied;

    this.saveScore();
  }

  public getScore(): RecordScore[] {
    let stringifyScore: string  = this.storageService.get(SCORE_KEY);
    let score: RecordScore[];

    if (stringifyScore) {
      score = JSON.parse(stringifyScore);
    } else {
      score = [];
    }

    return score;
  }

  private saveScore() {
    this.storageService.save(SCORE_KEY, JSON.stringify(this.score));
    this.publishChanges();
  }

  public getUserRecord(username: string): RecordScore {
    this.score = this.score || this.getScore();
    return this.score.find((record: RecordScore) => record.username === username);
  }

  public getEmptyRecord(username: string): RecordScore {
    return <RecordScore>{ username, won: 0, tied: 0, lost: 0 };
  }



}

