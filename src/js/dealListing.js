function listTemplate(deal) {
  return `<li class="deal-card">
            <a class="deal-card__title" href="/dealDetails/?id=${
              deal.dealID
            }"><h2>${deal.title}</h2></a>
            <picture>
              <source
                media="(min-width: 500px)"
                srcset="${deal.thumb}"/>
              <source
                media="(min-width: 800px)"
                srcset="${deal.thumb}"/>
              <img
                src="${deal.thumb}"
                alt="${deal.title} cover"
                class="deal-card__image"
              />
            </picture>
            <p class="deal-card__rating">${deal.savings.toFixed(0)}</p>"
            <div class="deal-card__details">
              <div class="deal-card__prices">
                <p class="deal-card__retail">${deal.normalPrice}</p>
                <p class="deal-card__list">${deal.salePrice}</p>
              </div>
              <div class="deal-card__actions" data-id="${deal.dealID}">
                <a class="deal-card__wish" href="#" title="Add to Wishlist">
                  <img src="images/heart-svgrepo-com.svg" alt="Wishlist" />
                </a>
                <a class="deal-card__shop" href="https://www.cheapshark.com/redirect?dealID=${
                  deal.id
                }" title="Purchase">
                  <img
                    src="images/shopping-cart-svgrepo-com.svg"
                    alt="Store Page"
                  />
                </a>
              </div>
            </div>
          </li>`;
}
