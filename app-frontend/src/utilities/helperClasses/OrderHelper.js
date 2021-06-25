class OrderHelper {
    constructor(firstName, lastName, mobileNumber, address, city, state, country, zipcode, products, deliveryType) {
        this.product_purchased = products
        this.customer_details = {
            customer_name: firstName + " " + lastName,
            customer_mobile: mobileNumber,
            customer_address: {
                shipping_address: address,
                city: city,
                state: state,
                country: country,
                zipcode: zipcode
            }

        }
        this.delivery = deliveryType
    }
}

export default OrderHelper