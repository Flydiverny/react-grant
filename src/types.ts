export type Actions = string | string[];
export type Action = string;
export type Verifier = (actions: Actions) => boolean;
