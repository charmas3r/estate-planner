import Image from "next/image";

export const Avatar = () => {
    return (
        <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
                <Image src="/trust-avatar.png" alt="me" width="200" height="200" />
            </div>
        </div>
    )
}