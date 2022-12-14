import {Exercise} from './exercises';

const templates: Array<{
  name: string;
  exercises: Array<Exercise>;
  maxs: Array<string>;
}> = [
  {
    name: 'Chest & Back',
    exercises: [
      'Bench Press (Barbell)',
      'Chest Supported Row (Dumbbell)',
      'Machine Fly',
    ],
    maxs: ['100kg x 5', '33kg x 8', '75.5kg x 12'],
  },
  {
    name: 'Arms',
    exercises: ['Cable Curl', 'EZ Bar Skullcrusher', 'Hammer Preacher Curl'],
    maxs: ['18kg x 5', '27kg x 8', '75.5kg x 12'],
  },
  {
    name: 'Legs',
    exercises: ['Leg Press', 'Romanian Deadlift (Barbell)', 'Hack Squat'],
    maxs: ['140kg x 5', '50kg x 5', '80kg x 12'],
  },
];

export default templates;
