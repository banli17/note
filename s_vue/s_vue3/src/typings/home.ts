export enum CATEGORY_TYPES {
  ALL,
  REACT,
  VUE,
  NODE
}

interface ISliders {
  url: string
}
interface ILessons {
  hasMore: boolean,
  loading: boolean,
  offset: number,
  limit: number,
  list: any,
}
export interface IHomeState {
  currentCategory: CATEGORY_TYPES;
  sliders: ISliders[],
  lessons: ILessons
}
export interface IGlobalState {
  home: IHomeState
}

export default {};
