import Swal from "sweetalert2"
import { Definer } from "./Definer"

export const sweetErrorHandling = async (err: any, sweet_off: boolean = false) => {
    let error_message = err.message.icludes("att") ? err.message : Definer.general_err1;
    if (sweet_off) {
        alert(error_message);
    } else {
        await Swal.fire({
            icon: "error",
            text: error_message,
            showConfirmButton: false
        })
    }
}

export const sweetTopSuccessAlert = async (msg: string, duration: number = 2000) => {
    await Swal.fire({
        position: "top-end",
        icon: "success",
        title: msg,
        showConfirmButton: false,
        timer: duration
    })
    window.location.reload()
}