export const ORIENTATION_OPTIONS = {
  row: 'row',
  column: 'column',
} as const;
export type OrientationOption =
  (typeof ORIENTATION_OPTIONS)[keyof typeof ORIENTATION_OPTIONS];

export interface FormOptions {
  orientation?: OrientationOption;
  labelOrientation?: OrientationOption;
}

export type ElementFormOptions = FormOptions;
