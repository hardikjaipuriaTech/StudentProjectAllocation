import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor() { }

  logLevel: LogLevel = LogLevel.Debug; // Set your desired log level

  log(message: string, level: LogLevel) {
    if (this.logLevel <= level) {
      console.log(message);
    }
  }

  debug(message: string) {
    this.log(message, LogLevel.Debug);
  }

  info(message: string) {
    this.log(message, LogLevel.Info);
  }

  warn(message: string) {
    this.log(message, LogLevel.Warn);
  }

  error(message: string) {
    this.log(message, LogLevel.Error);
  }
}

export enum LogLevel {
  Debug = 0,
  Info = 1,
  Warn = 2,
  Error = 3
}
