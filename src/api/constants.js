import { dateTimeToUtc } from './helper';

export const colors = {
  primary: '#74b9ff',
  secondary: '#dfe6e9',
  tertiary: '#E3E3E3',
  success: '#00b894',
  danger: '#d63031',
  muted: '#636e72',
  disabled: '#b2bec3',
  dark: '#2d3436',
  light: '#ffffff',
  reddit: '#FF4500',
};

export const reasons = [
  'Fear of failure',
  'Lack of motivation',
  'Too distracted',
  'Overwhelmed',
  'Lack of energy',
  'Poor organization',
  'Perfectionism',
  'Low self-esteem',
  'Indecisiveness',
  'Celebrating',
  'Abstract goals',
  'Other',
];

const from = new Date();
from.setHours(9);
from.setMinutes(0);
from.setSeconds(0);

const to = new Date();
to.setHours(18);
to.setMinutes(0);
to.setSeconds(0);

export const defaultSettings = {
  frequency: 2,
  availableTime: {
    start: dateTimeToUtc(from), // TODO check if settins 9.00 am to 6.00 pm
    end: dateTimeToUtc(to),
  },
  // TODO check if changing "0"-"6" to 1-7 broke something (eg dayPicker)
  availableDays: [
    { id: 1, value: 'Monday', isSelected: true },
    { id: 2, value: 'Tuesday', isSelected: true },
    { id: 3, value: 'Wednesday', isSelected: true },
    { id: 4, value: 'Thursday', isSelected: true },
    { id: 5, value: 'Friday', isSelected: true },
    { id: 6, value: 'Saturday', isSelected: false },
    { id: 7, value: 'Sunday', isSelected: false },
  ],
};

export const questionNotificationTitle =
  'Are you procrastinating right now?';

export const appStoreUrls = {
  android:
    'https://play.google.com/store/apps/details?id=com.procrastination.tracker.android',
  ios: 'https://testflight.apple.com/join/4L3iX484',
};

export const motivationalQuotes = [
  {
    quote:
      'Never put off till tomorrow what may be done day after tomorrow just as well.',
    author: 'Mark Twain',
  },
  {
    quote: 'You may delay, but time will not.',
    author: 'Benjamin Franklin',
  },
  {
    quote: 'Procrastination is the thief of time, collar him.',
    author: 'Charles Dickens',
  },
  {
    quote: 'A year from now you may wish you had started today.',
    author: 'Karen Lamb',
  },
  {
    quote:
      'You cannot escape the responsibility of tomorrow by evading it today.',
    author: 'Abraham Lincoln',
  },
  {
    quote: 'Someday is not a day of the week.',
    author: 'Janet Dailey',
  },
  {
    quote: 'Never leave till tomorrow that which you can do today.',
    author: 'Benjamin Franklin',
  },
  {
    quote:
      'The best time to plant a tree was 20 years ago. The second best time is now.',
    author: 'Chinese Proverb',
  },
  {
    quote:
      "Procrastination is like a credit card: it's a lot of fun until you get the bill.",
    author: 'Christopher Parker',
  },
  {
    quote:
      'Procrastination makes easy things hard, hard things harder.',
    author: 'Mason Cooley',
  },
  {
    quote: "Procrastination is opportunity's assassin.",
    author: 'Victor Kiam',
  },
  {
    quote:
      'Nothing is so fatiguing as the eternal hanging on of an uncompleted task.',
    author: 'William James',
  },
  {
    quote:
      'To think too long about doing a thing often becomes its undoing.',
    author: 'Eva Young',
  },
  {
    quote: 'The best way to get something done is to begin.',
    author: 'Author Unknown',
  },
  {
    quote:
      'There is nothing so fatal to character as half finished tasks.',
    author: 'David Lloyd George',
  },
  {
    quote: 'Don’t wait. The time will never be just right.',
    author: 'Napoleon Hill',
  },
  { quote: 'Stop talking. Start walking.', author: 'L.M. Heroux' },
  {
    quote:
      "When there's a hill to climb, don’t think that waiting will make it smaller.",
    author: 'Author Unknown',
  },
  { quote: 'Delay not to seize the hour!', author: 'Aeschylus' },
  {
    quote: 'Begin doing what you want to do now.',
    author: 'Marie Beynon Ray',
  },
  {
    quote: 'If and When were planted, and Nothing grew.',
    author: 'Proverb',
  },
  {
    quote: 'How soon not now, becomes never.',
    author: 'Martin Luther',
  },
  {
    quote:
      'The only difference between success and failure is the ability to take action.',
    author: 'Alexandre Graham Bell',
  },
  {
    quote:
      'You cannot plough a field by turning it over in your mind.',
    author: 'Author Unknown',
  },
  {
    quote:
      'Do you know what happens when you give a procrastinator a good idea? Nothing!',
    author: 'Donald Gardner',
  },
  {
    quote:
      'Begin while others are procrastinating. Work while others are wishing.',
    author: 'William Arthur Ward',
  },
  { quote: 'He who hesitates is a damned fool.', author: 'Mae West' },
  {
    quote: 'Time wasted is existence; used is life.',
    author: 'Edward Young',
  },
  {
    quote: 'Today is the only cash you have, so spend it wisely.',
    author: 'Kim Lyons',
  },
  {
    quote:
      'I don’t wait for moods. Your mind must know it has got to get down to work.',
    author: 'Pearl S. Buck',
  },
  {
    quote:
      'Neither a wise nor a brave man lies down on the tracks of history to wait for the train of the future to run over him.',
    author: 'Eisenhower',
  },
];
