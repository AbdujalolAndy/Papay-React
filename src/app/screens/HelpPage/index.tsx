import React from "react"
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Container, Stack, Tab, Typography } from "@mui/material"
import "../../../css/help.css"
import { TabContext, TabList, TabPanel } from "@mui/lab"
import { ExpandMore } from "@mui/icons-material"

export function HelpPage() {
    const [value, setValue] = React.useState("1")

    const faq = [
        {
            question: "to\'lov anday amalga oshiriladi",
            answer: "to\'lovni Payme, Click ilovalari orqali amalga oshiriladi"
        },
        {
            question: "buyurtmalar qancha vaqtda yetib keladi",
            answer: "buyurtmalar harid qilgan narsangizga qarab har xil bo'lishi mumkin"
        },
        {
            question: "saytdan foydalansam ma'lumotlarim havfsizligiga kafolat bormi?",
            answer: "albatta, bizning dasturchilamiz sizning ma'lumotlaringiz havfsizligiga kafolat berishadi"
        },
        {
            question: "saytda muammo yuzaga kelsa kimga murojaat qilaman?",
            answer: "albatta, bizning dasturchilamiz sizning ma'lumotlaringiz havfsizligiga kafolat berishadi"
        },
        {
            question: "men foydalanuvchi emas Biznesmen sifatida faoliyat  yuritmoqchiman. Nima qilishim kerak?",
            answer: "hurmatli mijoz, saytda ko'rsatilgan telefon raqamlarga qo'ng'iroq qilishingizni so'rab qolamiz!"
        },
        {
            question: "men Koreya davlatidaman. O'zbekistondagi oilam uchun Ovqat buyurtma qilmoqchiman. Visa yoki master kartasidan foydalana olamanmi?",
            answer: "albatta, chet eldan turib nafaqat  visa va master balkim paypal dasturidan foydalangan holda buyurtma qilishingiz mumkin! "
        },
        {
            question: "buyurtmani bekor qilmoqchiman lekin buni qanday qilishni bilmayman",
            answer: "buyurtmani bekor qilish uchun Avvalo login qiling va buyurtmalarim bo'limidan kerakli bo'lgan buyurtmangizni bekor qilish tugmasi orqali bekor qilsangiz bo'ladi!"
        },
        {
            question: "buyurtmani To'lov qilish uchun nima qilishim kerak?",
            answer: "buyurtma uchun to'lovni amalga oshirish uchun login qilishingiz va buyurtmalarim sahifasiga o'tishingiz lozim. Ochilgan sahifadan to'lov qilish tugmasi orqali to'lovni amalga oshira olasiz"
        },
        {
            question: "karta ma'lumotlarimni qayerga kiritaman?",
            answer: "karta ma'lumotlarini Buyurtmalarim sahifasining o'ng tomonida joylashgan maxsus joyga kiritishingiz darkor"
        },
        {
            question: "buyurtmani yakunlagandan so'ng o'zimni fikrimni yozib qoldirishim shartmi?",
            answer: "hurmatli mijoz, sizni fikr qoldirishga majburlamaymiz, lekin fikringiz biz uchun juda qadrli hisoblanadi!"
        },
        {
            question: "maqola yozishni xohlayman",
            answer: "maqola yozish uchun sahifam bo'limidan maqola yozish tugmasini bossangiz kifoya!"
        },
        {
            question: "jonli muloqatga men ham qatnasha olamanmi?",
            answer: "biror bir sahifani ko'p kuzatsam uni o'zimni sahifamdan tezda topib olishim uchun nima qilishim kerak?"
        },
        {
            question: "sayt rivoji uchun o'z hissamni qo'shmoqchiman",
            answer: "albatta buning uchun adminga xat qoldirishigniz yoki berilgan telefon raqamlariga bog'lansangiz to'liqroq ma'lumot beriladi!"
        },
    ]
    const rules = [
        "Saytdan to'laqonli yani buyurtmalar qilish, jonli muloqotlardan foydalanishingiz uchun ro'yxatdan o'tishingiz shart.",
        "Buyurtmalaringizga to'lovni amalga oshirganingizdan so'ng bekor qilishning imkoni yo'q shu sababli to'lovlarni amalga oshirishdan avval tekshirib oling.",
        "Jonli muloqot vaqtida bexayo so'zlarni ishlatish mutlaqo taqiqlanadi.",
        "Shaxsiy reklamalarni adminning ruxsatisiz yozish va tarqatish mumkun emas.",
        "Maqolalaringiz odob doirasidan chiqib ketmasligi shart.",
        "Barcha xarakatlaringiz adminlarimiz nazorati ostida bo'lani sabab iltimos talablarimizni xurmat qiling."
    ]

    const handleValue = (event: any, newValue: string) => {
        setValue(newValue)
    }

    return (
        <div className="help_page">
            <Container maxWidth={"lg"} sx={{ mt: "50px", mb: "50px" }}>
                <TabContext value={value}>
                    <Box className="help_menu">
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                            <TabList
                                onChange={handleValue}
                                aria-label="Lab API tabs example"
                                style={{ display: "flex", justifyContent: "space-between" }}
                            >
                                <Tab value={"1"} label="Qoidalar" />
                                <Tab value={"2"} label="FAQ" />
                                <Tab value={"3"} label="Adminga xat" />
                            </TabList>
                        </Box>
                    </Box>
                    <Stack>
                        <Stack className="help_main_content">
                            <TabPanel value="1">
                                <Stack className="theRules_box">
                                    <Box className="theRulesFrame">
                                        {rules.map((ele: string, number: number) => {
                                            return (
                                                <p>{ele}</p>
                                            )
                                        })}
                                    </Box>
                                </Stack>
                            </TabPanel>
                            <TabPanel value="2">
                                <Stack className="accordian_menu" style={{ overflowY: "hidden", height:"1000px" }}>
                                    {faq.map((ele, number: number) => {
                                        return (
                                            <Accordion>
                                                <AccordionSummary
                                                    expandIcon={<ExpandMore />}
                                                    aria-aria-controls="panella-content"
                                                    id="panella-header"
                                                >
                                                    <Typography>{ele.question}</Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Typography>
                                                        {ele.answer}
                                                    </Typography>
                                                </AccordionDetails>
                                            </Accordion>
                                        )
                                    })}
                                </Stack>
                            </TabPanel>
                            <TabPanel value="3">
                                <Stack className="admin_letter_box">
                                    <Stack className="admin_letter_container">
                                        <Box className="admin_letter_frame">
                                            <span>Adminga Xabar Qoldirish</span>
                                            <p>Assalomu alaykum Adminga xabar qoldirish uchun pasdagi formani to'ldiring!{" "}</p>
                                        </Box>
                                        <form
                                            action="#"
                                            method="POST"
                                            className="admin_letter_frame">
                                            <div className="admin_input_box">
                                                <label htmlFor="name">Ism</label>
                                                <input
                                                    type="text"
                                                    name="mb_nick"
                                                    placeholder="Ism"
                                                    id="name"
                                                />
                                            </div>
                                            <div className="admin_input_box">
                                                <label htmlFor="email">Electron Manzil</label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="mb_email"
                                                    placeholder="Electron Manzil"
                                                />
                                            </div>
                                            <div className="admin_input_box">
                                                <label htmlFor="message">Xabar</label>
                                                <textarea name="mb_msg" id="message" placeholder="Xabar"></textarea>
                                            </div>
                                            <Box
                                                display={"flex"}
                                                justifyContent={"flex-end"}
                                                sx={{ mt: "30px" }}
                                            >
                                                <Button type="submit" variant="contained">JO'NATISH</Button>
                                            </Box>
                                        </form>
                                    </Stack>
                                </Stack>
                            </TabPanel>
                        </Stack>
                    </Stack>
                </TabContext>
            </Container>
        </div >
    )
}