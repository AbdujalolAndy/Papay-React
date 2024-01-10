
import { Cancel, ShoppingCart } from "@mui/icons-material";
import { Badge, Box, Button, IconButton, Menu, Stack } from "@mui/material";
import { useState } from "react";
import { serverApi } from "../../../lib/config";
import { CartItem } from "../../types/others";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import OrderServiceApi from "../../apiServices/orderApiService";
import { useHistory } from "react-router";
import { verifiedMemberData } from "../../apiServices/verify";

export default function Basket(props: any) {
    // Initializations
    const history = useHistory()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const { cartItems, setOrderRebuild } = props;
    const itemPrice = cartItems.reduce((a: any, c: CartItem) => a + c.price * c.quantity, 0)
    const shippingPrice = itemPrice > 100 ? 0 : 2
    const totalPrice = itemPrice + shippingPrice
    // Handlers
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const processOrderHandler = async () => {
        try {
            assert.ok(verifiedMemberData, Definer.auth_err1);
            const orderService = new OrderServiceApi();
            await orderService.createOrder(cartItems);

            props.onDeleteAll()
            handleClose()
            
            setOrderRebuild(new Date)
            history.push("/orders");
        } catch (err: any) {
            console.log(err.message);
            sweetErrorHandling(err).then()
        }
    }
    return (
        <Box className={"hover-line"}>
            <IconButton
                aria-label="cart"
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
            >
                <Badge badgeContent={cartItems.length} color="secondary">
                    <img src="/icons/shopping_cart.svg" alt="" />
                </Badge>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        "&:before": {
                            content: "''",
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "traanslateY(-50%) rotate(45deg)",
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                <Stack className="basket_frame">
                    <Box className="all_check_box">
                        {cartItems.length === 0 ? (
                            <div>Cart is Empty!</div>
                        ) : (
                            <div>My Cart Products</div>
                        )}
                    </Box>
                    <Box className="orders_main_wrapper">
                        <Box className="orders_wrapper">
                            {cartItems.map((product: any, index: number) => {
                                const image_path = `${serverApi}/${product.image}`;
                                return (
                                    <Box key={index} className="basket_info_box">
                                        <div className="cancel_btn">
                                            <Cancel color={"primary"} onClick={() => props.onDelete(product)} />
                                        </div>
                                        <img src={image_path} className="product_img" />
                                        <span className="product_name">{product.name}</span>
                                        <p className="product_price">
                                            {product.price}$ x {product.quantity}
                                        </p>
                                        <Box sx={{ minWidth: 120 }}>
                                            <div className="col-2">
                                                <button className="remove" onClick={() => props.onRemove(product)}>
                                                    -
                                                </button>{" "}
                                                <button className="add" onClick={() => props.onAdd(product)}>
                                                    +
                                                </button>
                                            </div>
                                        </Box>
                                    </Box>
                                );
                            })}
                        </Box>
                    </Box>
                    {cartItems.length > 0 && (
                        <Box className="to_order_box">
                            <span className="price_text">Jami: ${totalPrice} ({itemPrice}+{shippingPrice})</span>
                            <Button onClick={processOrderHandler} startIcon={<ShoppingCart />} variant="contained">
                                Buyurtma Qilish
                            </Button>
                        </Box>
                    )}
                </Stack>
            </Menu>
        </Box>
    );
}
