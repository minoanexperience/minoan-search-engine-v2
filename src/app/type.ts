export interface Product{
  ID:string,
  BRAND_NAME : string,
  PRODUCT_IMAGE_URL : string,
  PRODUCT_URL : string,
  PRICE_PER_UNIT : number,
  DESCRIPTION : string,
  PRODUCT_NAME : string,
  similarity_score : number
}
export interface Brand{
  id : number,
  name : string,
  landingImage : string,
  webLink : string,
  whiteLogo : string,
  discountToProperty : number,
  isSaleOn : boolean,
  darkLogo : string,
}
