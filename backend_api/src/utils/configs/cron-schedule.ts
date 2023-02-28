import cron from 'cron';
import { GuestScheduleDeletion, handleDeletionOfAllFiles } from '../services';
import path from 'path';

const job = new cron.CronJob('*/1 * * * *', () => {
  GuestScheduleDeletion();
});

const deleteJob = new cron.CronJob('*/5 * * * * *', () => {
  handleDeletionOfAllFiles(path.join(__dirname, '..', '../uploads'));
});

export const startCronJob = (): void => {
  job.start();
  deleteJob.start();
};
