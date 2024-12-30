import axios from 'axios';

export const fetchCartData = async (token, DOMAIN) => {
    try {
        const res = await axios.get(`${DOMAIN}products/cartData`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const updatedData = res.data.map(item => ({ ...item, quantity: 1 }));
        const totalBill = updatedData.reduce((sum, item) => sum + item.price, 0);
        return { updatedData, totalBill };
    } catch (error) {
        console.error("Error fetching cart data:", error);
    }
};
