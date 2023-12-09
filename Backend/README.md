# Operatii cu useri

## Login

POST request la http://localhost:3000/Users/Login cu email si parola care
returneaza un token. Salveaza tokenul

## Sign-in

POST request la http://localhost:3000/Users/ cu email si parola si returneaza
un token. Salveaza tokenul

## Adaugare business

PATCH request la http://localhost:3000/Users/Business cu un body de forma:

{

-   name: String,
-   main_category: String,
-   main_products: [String],

}

Si cu un header care contine tokenul la Authorization

Returneaza un obiect de tip business de forma:
{

-   \_id: String,
-   name: String,
-   main_category: String,
-   main_products: [String],
-   clients: [Ids],
-   parteneri: [Ids],

}

## Eliminare business

DELETE request la http://localhost:3000/Users/Business/ID unde ID e elementul din campul "\_id". Iarasi trebuie sa fie un header care contine tokenul la Authentification.

# Operatii cu Business-uri

Toate operatiile astea trebuie sa aiba tokenul in header

## Obtinere Business-uri

GET http://localhost:3000/Businesses returneaza un json cu un array cu businessurile user-ului curent.

## Adaugare clienti

POST request la http://localhost:3000/Businesses/ID/clients unde ID e elementul
din campul "\_id". Body-ul trebuie sa contina un camp client de tip String

## Adaugare parteneri

POST request la http://localhost:3000/Businesses/ID/partners unde ID e elementul
din campul "\_id". Body-ul trebuie sa contina un camp partner de tip String

## Stergere client

DELETE equest la http://localhost:3000/Businesses/ID/clients unde ID e elementul
din campul "\_id". Body-ul trebuie sa contina un camp client de tip String cu numele clientului

## Stergere parteneri

DELETE request la http://localhost:3000/Businesses/ID/partners unde ID e elementul
din campul "\_id". Body-ul trebuie sa contina un camp partner de tip String cu numele partenerului

# Cautare potentiali clienti/parteneri

Amandoua se fac cu un POST request la http://localhost:3000/Parteners sau http://localhost:3000/Clients care contine in header tokenul, si in body un json de forma:

{

-   cities: [String],
-   products: [String],
-   possible_industries: [String]

}

Momentan returneaza toate datele primite de la Veridion
