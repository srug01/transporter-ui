import { Platform } from '@angular/cdk/platform';
import * as dayjs from 'dayjs';
import 'dayjs/locale/en';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';
import * as localizedFormat from 'dayjs/plugin/localizedFormat';
import { NativeDateAdapter } from '@angular/material/core';


/**
* Custom Date-Formats and Adapter (using https://github.com/iamkun/dayjs)
*/

export const AppDateFormats = {
  parse: {
    dateInput: 'DD/MMM/YYYY',
  },
  display: {
    dateInput: 'DD/MMM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD/MMM/YYYY',
    monthYearA11yLabel: 'MMM YYYY',
  },
};

export class AppDateAdapter extends NativeDateAdapter {

  constructor(matDateLocale: string, platform: Platform) {
    super(matDateLocale, platform)

    // Initalize DayJS-Parser
    dayjs.locale('en')
    dayjs.extend(customParseFormat)
    dayjs.extend(localizedFormat)
  }

  parse(value: any): Date | null {
    return dayjs(value, 'DD/MMM/YYYY').toDate()
  }

  format(date: Date, displayFormat: any): string {
    return dayjs(date).format(displayFormat)
  }

}