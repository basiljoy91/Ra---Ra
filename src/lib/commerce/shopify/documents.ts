export const PRODUCT_FIELDS = `
  fragment ProductFields on Product {
    id
    handle
    title
    description
    productType
    availableForSale
    tags
    seo { title description }
    priceRange {
      minVariantPrice { amount currencyCode }
      maxVariantPrice { amount currencyCode }
    }
    compareAtPriceRange {
      minVariantPrice { amount currencyCode }
      maxVariantPrice { amount currencyCode }
    }
    options { id name optionValues { name } }
    images(first: 20) {
      nodes { url altText width height }
    }
    variants(first: 100) {
      nodes {
        id
        title
        sku
        availableForSale
        quantityAvailable
        selectedOptions { name value }
        price { amount currencyCode }
        compareAtPrice { amount currencyCode }
        image { url altText width height }
      }
    }
    collections(first: 10) { nodes { handle } }
  }
`;

export const PRODUCTS_QUERY = `
  ${PRODUCT_FIELDS}
  query StorefrontProducts($first: Int!, $query: String, $country: CountryCode!)
    @inContext(country: $country) {
    products(first: $first, query: $query, sortKey: TITLE) {
      nodes { ...ProductFields }
    }
  }
`;

export const PRODUCT_BY_HANDLE_QUERY = `
  ${PRODUCT_FIELDS}
  query StorefrontProduct($handle: String!, $country: CountryCode!)
    @inContext(country: $country) {
    product(handle: $handle) { ...ProductFields }
  }
`;

export const COLLECTION_BY_HANDLE_QUERY = `
  ${PRODUCT_FIELDS}
  query StorefrontCollection($handle: String!, $first: Int!, $country: CountryCode!)
    @inContext(country: $country) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      seo { title description }
      image { url altText width height }
      products(first: $first, sortKey: COLLECTION_DEFAULT) {
        nodes { ...ProductFields }
      }
    }
  }
`;

export const COLLECTIONS_QUERY = `
  query StorefrontCollections($first: Int!, $country: CountryCode!)
    @inContext(country: $country) {
    collections(first: $first, sortKey: TITLE) {
      nodes {
        id
        handle
        title
        description
        seo { title description }
        image { url altText width height }
      }
    }
  }
`;

export const CART_FIELDS = `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount { amount currencyCode }
      totalAmount { amount currencyCode }
    }
    lines(first: 100) {
      nodes {
        id
        quantity
        cost { totalAmount { amount currencyCode } }
        merchandise {
          ... on ProductVariant {
            id
            title
            sku
            availableForSale
            quantityAvailable
            selectedOptions { name value }
            price { amount currencyCode }
            compareAtPrice { amount currencyCode }
            image { url altText width height }
            product { id handle title }
          }
        }
      }
    }
  }
`;

export const CART_QUERY = `
  ${CART_FIELDS}
  query StorefrontCart($id: ID!, $country: CountryCode!)
    @inContext(country: $country) {
    cart(id: $id) { ...CartFields }
  }
`;

export const CART_CREATE_MUTATION = `
  ${CART_FIELDS}
  mutation StorefrontCartCreate($input: CartInput!, $country: CountryCode!)
    @inContext(country: $country) {
    cartCreate(input: $input) {
      cart { ...CartFields }
      userErrors { field message code }
      warnings { message code }
    }
  }
`;

export const CART_LINES_ADD_MUTATION = `
  ${CART_FIELDS}
  mutation StorefrontCartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!, $country: CountryCode!)
    @inContext(country: $country) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart { ...CartFields }
      userErrors { field message code }
      warnings { message code }
    }
  }
`;

export const CART_LINES_UPDATE_MUTATION = `
  ${CART_FIELDS}
  mutation StorefrontCartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!, $country: CountryCode!)
    @inContext(country: $country) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart { ...CartFields }
      userErrors { field message code }
      warnings { message code }
    }
  }
`;

export const CART_LINES_REMOVE_MUTATION = `
  ${CART_FIELDS}
  mutation StorefrontCartLinesRemove($cartId: ID!, $lineIds: [ID!]!, $country: CountryCode!)
    @inContext(country: $country) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart { ...CartFields }
      userErrors { field message code }
      warnings { message code }
    }
  }
`;
