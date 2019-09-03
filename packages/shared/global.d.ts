declare type unsafe = any;
declare type Present = {} | void;
declare type Option<T> = T | null;
declare type Maybe<T> = Option<T> | undefined | void;
declare type Recast<T, U> = (T & U) | U;
declare interface Dict<T> {
  [key: string]: T;
}
