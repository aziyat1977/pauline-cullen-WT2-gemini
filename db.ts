import Dexie, { Table } from 'dexie';
import { Essay, WeeklyReport } from './types';

class CullenDatabase extends Dexie {
  essays!: Table<Essay>;
  weeklyReports!: Table<WeeklyReport>;

  constructor() {
    super('CullenMasteryDB');
    // Cast this to any to avoid type error where 'version' property is not detected on CullenDatabase type in some environments
    (this as any).version(1).stores({
      essays: '++id, taskId, date, score',
      weeklyReports: '++id, weekNumber'
    });
  }
}

export const db = new CullenDatabase();