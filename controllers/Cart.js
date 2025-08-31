import { Cart } from "../models/Cart.js";

// 🛒 Get Cart
export const getCart = async (req, res) => {
  const cart = await Cart.findOne({ userId: req.userId });
  res.json(cart || { items: [] });
};

// 🛒 Add to Cart
export const addtoCart = async (req, res, next) => {
  try {
    const { productId, name, price, quantity, image } = req.body; // image add kiya
    let cart = await Cart.findOne({ userId: req.userId });

    if (!cart) {
      cart = new Cart({ userId: req.userId });
    }

    const itemIndex = cart.items.findIndex(item => item.productId === productId);

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += Number(quantity);
    } else {
      cart.items.push({
        productId,
        name,
        price,
        quantity: Number(quantity),
        image, // image save kar rahe hain
      });
    }

    cart.total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Item added to cart",
      cart,
    });
  } catch (error) {
    next(error);
  }
};


// 🛒 Update Item Quantity
export const updateCartItemQuantity = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await Cart.findOne({ userId: req.userId });

    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    // const itemIndex = cart.items.findIndex(item => item.productId === productId);
    const itemIndex = cart.items.findIndex(
      item => String(item.productId) === String(productId)
    );


    if (itemIndex === -1) {
      return res.status(404).json({ success: false, message: "Product not found in cart" });
    }

    cart.items[itemIndex].quantity = quantity;

    cart.total = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart item quantity updated",
      cart,
    });
  } catch (error) {
    next(error);
  }
};

// 🛒 Remove from Cart
export const removeFromCart = async (req, res, next) => {
  try {
    const { productId } = req.body;
    const cart = await Cart.findOne({ userId: req.userId });

    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    // Item remove karo
    cart.items = cart.items.filter(item => String(item.productId) !== String(productId));

    // Total dobara calculate karo
    cart.total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Item removed from cart",
      cart,
    });
  } catch (error) {
    next(error);
  }
};
