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