//Esta interface es un contrato de atributos y métodos que deben ser implementados por una o más clases.
//Sirven para modelar los datos que inyectamos desde una API por ejemplo

export interface Product {
    "id": number,
    "name": string,
    "price": number,
    "description": string,
    "categoryId": number,
    "stock": number
}

