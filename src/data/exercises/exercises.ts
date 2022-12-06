export enum ExerciseCategories {
  Abs = 'Abs',
  Back = 'Back',
  Biceps = 'Biceps',
  Calves = 'Calves',
  Chest = 'Chest',
  Compounds = 'Compounds',
  Forearms = 'Forearms',
  'Full Body' = 'Full Body',
  Glutes = 'Glutes',
  Hamstrings = 'Hamstrings',
  Legs = 'Legs',
  Olympic = 'Olympic',
  Shoulders = 'Shoulders',
  Triceps = 'Triceps',
  Quads = 'Quads',
}

const exercises = [
  {
    name: 'Hanging Knee Raise',
    category: [ExerciseCategories.Abs],
  },
  {
    name: 'Machine Crunch',
    category: [ExerciseCategories.Abs],
  },
  {
    name: 'Cable Crunch',
    category: [ExerciseCategories.Abs],
  },
  {
    name: 'Decline Crunch',
    category: [ExerciseCategories.Abs],
  },
  {
    name: 'Hanging Leg Raise',
    category: [ExerciseCategories.Abs],
  },
  {
    name: 'Russian Twist',
    category: [ExerciseCategories.Abs],
  },
  {
    name: 'Ab Roll-Out',
    category: [ExerciseCategories.Abs],
  },
  {
    name: 'Deadlift',
    category: [
      ExerciseCategories.Back,
      ExerciseCategories.Legs,
      ExerciseCategories['Full Body'],
      ExerciseCategories.Compounds,
    ],
  },
  {
    name: 'Paused Deadlift',
    category: [
      ExerciseCategories.Back,
      ExerciseCategories.Legs,
      ExerciseCategories['Full Body'],
      ExerciseCategories.Compounds,
    ],
  },
  {
    name: 'Deadlift (Sumo)',
    category: [
      ExerciseCategories.Back,
      ExerciseCategories.Legs,
      ExerciseCategories['Full Body'],
      ExerciseCategories.Compounds,
    ],
  },
  {
    name: 'Paused Deadlift (Sumo)',
    category: [
      ExerciseCategories.Back,
      ExerciseCategories.Legs,
      ExerciseCategories['Full Body'],
      ExerciseCategories.Compounds,
    ],
  },
  {
    name: 'Bent-Over Row',
    category: [ExerciseCategories.Back, ExerciseCategories.Compounds],
  },
  {
    name: 'Pull-Up',
    category: [ExerciseCategories.Back, ExerciseCategories.Compounds],
  },
  {
    name: 'T-Bar Row',
    category: [ExerciseCategories.Back],
  },
  {
    name: 'Seated Row (Handle, Single Arm)',
    category: [ExerciseCategories.Back],
  },
  {
    name: 'Seated Row (Wide Grip)',
    category: [ExerciseCategories.Back],
  },
  {
    name: 'Seated Row (Close Grip)',
    category: [ExerciseCategories.Back],
  },
  {
    name: 'Seated Row (Neutral Grip)',
    category: [ExerciseCategories.Back],
  },
  {
    name: 'Lat Pulldown (Wide)',
    category: [ExerciseCategories.Back],
  },
  {
    name: 'Lat Pulldown',
    category: [ExerciseCategories.Back],
  },
  {
    name: 'Lat Pulldown (Close)',
    category: [ExerciseCategories.Back],
  },
  {
    name: 'Single-Arm Dumbbell Row',
    category: [ExerciseCategories.Back],
  },
  {
    name: 'Chest Supported Row (Dumbbell)',
    category: [ExerciseCategories.Back],
  },
  {
    name: 'Hyperextensions',
    category: [ExerciseCategories.Back, ExerciseCategories.Legs],
  },
  {
    name: 'Straight Arm Pulldown',
    category: [ExerciseCategories.Back],
  },
  {
    name: 'Shrugs',
    category: [ExerciseCategories.Back],
  },
  {
    name: 'Machine Row',
    category: [ExerciseCategories.Back],
  },
  {
    name: 'Plate Loaded Row',
    category: [ExerciseCategories.Back],
  },
  {
    name: 'Plate Loaded Lat Pulldown',
    category: [ExerciseCategories.Back],
  },
  {
    name: 'Standing Dumbbell Curl',
    category: [ExerciseCategories.Biceps],
  },
  {
    name: 'Standing Barbell Curl',
    category: [ExerciseCategories.Biceps],
  },
  {
    name: 'Standing Hammer Curl',
    category: [ExerciseCategories.Biceps],
  },
  {
    name: 'Incline Dumbbell Curl',
    category: [ExerciseCategories.Biceps],
  },
  {
    name: 'EZ Bar Curl',
    category: [ExerciseCategories.Biceps],
  },
  {
    name: 'Preacher Curl (EZ Bar)',
    category: [ExerciseCategories.Biceps],
  },
  {
    name: 'Cable Curl',
    category: [ExerciseCategories.Biceps],
  },
  {
    name: 'Concentration Curl',
    category: [ExerciseCategories.Biceps],
  },
  {
    name: 'Cable Curl (Rope)',
    category: [ExerciseCategories.Biceps, ExerciseCategories.Forearms],
  },
  {
    name: 'Machine Bicep Curl',
    category: [ExerciseCategories.Biceps],
  },
  {
    name: 'Spider Curl',
    category: [ExerciseCategories.Biceps],
  },
  {
    name: 'High Pulley Cable Curl',
    category: [ExerciseCategories.Biceps],
  },
  {
    name: 'Reverse Curl (Dumbbell)',
    category: [ExerciseCategories.Biceps, ExerciseCategories.Forearms],
  },
  {
    name: 'Cable Curl (One Arm)',
    category: [ExerciseCategories.Biceps],
  },
  {
    name: 'Hammer Preacher Curl',
    category: [ExerciseCategories.Biceps, ExerciseCategories.Forearms],
  },
  {
    name: 'Incline Hammer Curl',
    category: [ExerciseCategories.Biceps, ExerciseCategories.Forearms],
  },
  {
    name: 'Reverse Curl (Barbell)',
    category: [ExerciseCategories.Biceps, ExerciseCategories.Forearms],
  },
  {
    name: 'Reverse Curl (Cable)',
    category: [ExerciseCategories.Biceps, ExerciseCategories.Forearms],
  },
  {
    name: 'Bench Press (Barbell)',
    category: [ExerciseCategories.Chest, ExerciseCategories.Compounds],
  },
  {
    name: 'Paused Bench Press (Barbell)',
    category: [ExerciseCategories.Chest, ExerciseCategories.Compounds],
  },
  {
    name: 'Bench Press (Dumbbell)',
    category: [ExerciseCategories.Chest, ExerciseCategories.Compounds],
  },
  {
    name: 'Bench Press (Smith Machine)',
    category: [ExerciseCategories.Chest],
  },
  {
    name: 'Incline Bench Press (Barbell)',
    category: [ExerciseCategories.Chest, ExerciseCategories.Compounds],
  },
  {
    name: 'Inline Bench Press (Dumbbell)',
    category: [ExerciseCategories.Chest, ExerciseCategories.Compounds],
  },
  {
    name: 'Incline Bench Press (Smith Machine)',
    category: [ExerciseCategories.Chest],
  },
  {
    name: 'Decline Bench Press (Barbell)',
    category: [ExerciseCategories.Chest, ExerciseCategories.Compounds],
  },
  {
    name: 'Decline Bench Press (Dumbbell)',
    category: [ExerciseCategories.Chest, ExerciseCategories.Compounds],
  },
  {
    name: 'Decline Bench Press (Smith Machine)',
    category: [ExerciseCategories.Chest],
  },
  {
    name: 'Machine Chest Press',
    category: [ExerciseCategories.Chest],
  },
  {
    name: 'Incline Machine Chest Press',
    category: [ExerciseCategories.Chest],
  },
  {
    name: 'Dip',
    category: [ExerciseCategories.Chest, ExerciseCategories.Compounds],
  },
  {
    name: 'Machine Fly',
    category: [ExerciseCategories.Chest],
  },
  {
    name: 'Cable Fly (High Pulley)',
    category: [ExerciseCategories.Chest],
  },
  {
    name: 'Cable Fly (Mid Pulley)',
    category: [ExerciseCategories.Chest],
  },
  {
    name: 'Cable Fly (Low Pulley)',
    category: [ExerciseCategories.Chest],
  },
  {
    name: 'Pec Deck',
    category: [ExerciseCategories.Chest],
  },
  {
    name: 'Farmers Walks',
    category: [ExerciseCategories.Forearms],
  },
  {
    name: 'Wrist Curl (Dumbbell)',
    category: [ExerciseCategories.Forearms],
  },
  {
    name: 'Wrist Curl Reverse (Dumbbell)',
    category: [ExerciseCategories.Forearms],
  },
  {
    name: 'Wrist Curl (EZ Bar)',
    category: [ExerciseCategories.Forearms],
  },
  {
    name: 'Wrist Curl Reverse (EZ Bar)',
    category: [ExerciseCategories.Forearms],
  },
  {
    name: 'Barbell Squat (High-Bar)',
    category: [ExerciseCategories.Legs, ExerciseCategories.Compounds],
  },
  {
    name: 'Hack Squat',
    category: [ExerciseCategories.Legs, ExerciseCategories.Quads],
  },
  {
    name: 'Barbell Squat (Low-Bar)',
    category: [ExerciseCategories.Legs, ExerciseCategories.Compounds],
  },
  {
    name: 'Leg Press',
    category: [ExerciseCategories.Legs],
  },
  {
    name: 'Romanian Deadlift (Barbell)',
    category: [ExerciseCategories.Legs, ExerciseCategories.Hamstrings],
  },
  {
    name: 'Romanian Deadlift (Dumbbell)',
    category: [ExerciseCategories.Legs, ExerciseCategories.Hamstrings],
  },
  {
    name: 'Hip Thrusts (Barbell)',
    category: [ExerciseCategories.Legs, ExerciseCategories.Glutes],
  },
  {
    name: 'Hip Thrust Machine',
    category: [ExerciseCategories.Legs, ExerciseCategories.Glutes],
  },
  {
    name: 'Bulgarian Split Squats',
    category: [ExerciseCategories.Legs],
  },
  {
    name: 'Lunges (Barbell)',
    category: [ExerciseCategories.Legs],
  },
  {
    name: 'Walking Lunges',
    category: [ExerciseCategories.Legs],
  },
  {
    name: 'Hamstring Curls (Lying)',
    category: [ExerciseCategories.Legs, ExerciseCategories.Hamstrings],
  },
  {
    name: 'Hamstring Curls (Seated)',
    category: [ExerciseCategories.Legs, ExerciseCategories.Hamstrings],
  },
  {
    name: 'Hamstring Curls (Standing)',
    category: [ExerciseCategories.Legs, ExerciseCategories.Hamstrings],
  },
  {
    name: 'Leg Extension',
    category: [ExerciseCategories.Legs, ExerciseCategories.Quads],
  },
  {
    name: 'Leg Extension (Single Leg)',
    category: [ExerciseCategories.Legs, ExerciseCategories.Quads],
  },
  {
    name: 'Front Squat',
    category: [
      ExerciseCategories.Legs,
      ExerciseCategories.Compounds,
      ExerciseCategories.Quads,
    ],
  },
  {
    name: 'Goblet Squat',
    category: [ExerciseCategories.Legs],
  },
  {
    name: 'Cable Kickback',
    category: [ExerciseCategories.Legs, ExerciseCategories.Glutes],
  },
  {
    name: 'Pause Squats (High-Bar)',
    category: [ExerciseCategories.Legs, ExerciseCategories.Compounds],
  },
  {
    name: 'Pause Squats (Low-Bar)',
    category: [ExerciseCategories.Legs, ExerciseCategories.Compounds],
  },
  {
    name: 'Hip Adductor Machine (Out to In)',
    category: [ExerciseCategories.Legs],
  },
  {
    name: 'Hip Abductor Machine (In to Out)',
    category: [ExerciseCategories.Legs],
  },
  {
    name: 'Seated Calf Raise Machine',
    category: [ExerciseCategories.Calves],
  },
  {
    name: 'Standing Calf Raise Machine',
    category: [ExerciseCategories.Calves],
  },
  {
    name: 'Single Leg Calf Raise (Standing)',
    category: [ExerciseCategories.Calves],
  },
  {
    name: 'Seated Calf Raise (Plate Loaded)',
    category: [ExerciseCategories.Calves],
  },
  {
    name: 'Seated Overhead Press (Dumbbell)',
    category: [ExerciseCategories.Shoulders],
  },
  {
    name: 'Millitary Press',
    category: [ExerciseCategories.Shoulders, ExerciseCategories.Compounds],
  },
  {
    name: 'Push Press',
    category: [ExerciseCategories.Shoulders, ExerciseCategories.Compounds],
  },
  {
    name: 'Clean and Jerk',
    category: [ExerciseCategories.Olympic, ExerciseCategories.Shoulders],
  },
  {
    name: 'Snatch',
    category: [ExerciseCategories.Olympic],
  },
  {
    name: 'Lateral Raise',
    category: [ExerciseCategories.Shoulders],
  },
  {
    name: 'Rear Delt Fly',
    category: [ExerciseCategories.Shoulders],
  },
  {
    name: 'Front Raises (Straight bar)',
    category: [ExerciseCategories.Shoulders],
  },
  {
    name: 'Font Raises (Rope)',
    category: [ExerciseCategories.Shoulders],
  },
  {
    name: 'Machine Lateral Raises',
    category: [ExerciseCategories.Shoulders],
  },
  {
    name: 'Rear Delt Row',
    category: [ExerciseCategories.Shoulders],
  },
  {
    name: 'Seated Overhead Press (Barbell)',
    category: [ExerciseCategories.Shoulders],
  },
  {
    name: 'Seated Overhead Press (Smith Machine)',
    category: [ExerciseCategories.Shoulders],
  },
  {
    name: 'Upright Row',
    category: [ExerciseCategories.Shoulders],
  },
  {
    name: 'Arnold Press',
    category: [ExerciseCategories.Shoulders],
  },
  {
    name: 'Front Raises (Dumbbell)',
    category: [ExerciseCategories.Shoulders],
  },
  {
    name: 'Tricep Extension (Straight Bar)',
    category: [ExerciseCategories.Triceps],
  },
  {
    name: 'Tricep Extension (Rope)',
    category: [ExerciseCategories.Triceps],
  },
  {
    name: 'Seated Tricep Extension (Dumbbell)',
    category: [ExerciseCategories.Triceps],
  },
  {
    name: 'Close Grip Bench Press',
    category: [ExerciseCategories.Triceps],
  },
  {
    name: 'EZ Bar Skullcrusher',
    category: [ExerciseCategories.Triceps],
  },
  {
    name: 'Lying Tricep Extension (Dumbbell)',
    category: [ExerciseCategories.Triceps],
  },
  {
    name: 'Tricep Dips',
    category: [ExerciseCategories.Triceps],
  },
  {
    name: 'Standing Tricep Extension (Dumbbell)',
    category: [ExerciseCategories.Triceps],
  },
  {
    name: 'One Arm Tricep Extension (Dumbbell)',
    category: [ExerciseCategories.Triceps],
  },
  {
    name: 'Tricep Extension (Reverse Grip, Straight Bar)',
    category: [ExerciseCategories.Triceps],
  },
  {
    name: 'Incline Skullcrushers',
    category: [ExerciseCategories.Triceps],
  },
  {
    name: 'Tricep Extension Overhead (High Pulley, Rope)',
    category: [ExerciseCategories.Triceps],
  },
  {
    name: 'Tricep Extension Overhead (Low Pulley, Rope)',
    category: [ExerciseCategories.Triceps],
  },
  {
    name: 'One Arm Tricep Extension (Cable)',
    category: [ExerciseCategories.Triceps],
  },
  {
    name: 'Tricep Extension (V Bar)',
    category: [ExerciseCategories.Triceps],
  },
  {
    name: 'Tricep Extension Overhead (High Pulley, Straight Bar)',
    category: [ExerciseCategories.Triceps],
  },
  {
    name: 'Seated EZ Bar French Press',
    category: [ExerciseCategories.Triceps],
  },
  {
    name: 'Machine Tricep Extension',
    category: [ExerciseCategories.Triceps],
  },
  {
    name: 'Dumbbell Tate Press',
    category: [ExerciseCategories.Triceps],
  },
] as const;

export const ExerciseNames = exercises.map(e => e.name);

export default exercises;
