export type CharacterQuerystring = {
    id?: string;
    name?: string;
    gender?: string;
    born?: string;
    died?: string;
    species?: string;
    height?: string;
    weight?: string;
    hair_color?: string;
    eye_color?: string;
    skin_color?: string;
    blood_status?: string;
    marital_status?: string;
    nationality?: string;
    animagus?: string;
    boggart?: string;
    house?: string;
    patronus?: string;
    alias_names?: string;
    jobs?: string;
    family_members?: string;
    romances?: string;
    wands?: string;
    image?: string;
    wiki?: string;
    titles?: string;
    sort?: string;
    order?: string;
    page?: number;
    size?: number;
}

export type BooksQuerystring = {
  id?: string;
  title?: string;
  summary?: string;
  author?: string;
  release_date?: string;
  dedication?: string;
  pages?: string;
  cover?: string;
  wiki?: string;
  chapters?: string;
  sort?: string;
  order?: string;
  page?: number;
  size?: number;
}

export type MoviesQuerystring = {
  id?: string;
  title?: string;
  summary?: string;
  directors?: string;
  screenwriters?: string;
  producers?: string;
  cinematographers?: string;
  editors?: string;
  distributors?: string;
  music_composers?: string;
  release_date?: string;
  running_time?: string;
  budget?: string;
  box_office?: string;
  rating?: string;
  trailer?: string;
  poster?: string;
  wiki?: string;
  sort?: string;
  order?: string;
  page?: number;
  size?: number;
}

export type PotionsQuerystring = {
  id?: string;
  name?: string;
  effect?: string;
  side_effects?: string;
  characteristics?: string;
  time?: string;
  difficulty?: string;
  ingredients?: string;
  inventors?: string;
  manufacturers?: string;
  image?: string;
  wiki?: string;
  sort?: string;
  order?: string;
  page?: number;
  size?: number;
}

export type SpellsQuerystring = {
  id?: string;
  slug?: string;
  name?: string;
  incantation?: string;
  category?: string;
  effect?: string;
  light?: string;
  hand?: string;
  creator?: string;
  image?: string;
  wiki?: string;
  sort?: string;
  order?: string;
  page?: number;
  size?: number;
}