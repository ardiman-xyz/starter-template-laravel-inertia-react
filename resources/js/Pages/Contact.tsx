import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import { Separator } from "@/Components/ui/separator";
import {
    Mail,
    Phone,
    MessageCircle,
    MapPin,
    Clock,
    Users,
    Send,
    ExternalLink,
} from "lucide-react";
import Guest from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";

const ContactPage = () => {
    const contactInfo = {
        emails: [
            {
                label: "Support Umum",
                email: "srosida@umkendari.ac.id",
                description: "Untuk bantuan umum dan pertanyaan seputar sistem",
                primary: true,
            },
            {
                label: "Support Umum & Admin Sistem",
                email: "warosida68@gmail.com",
                description: "Untuk permintaan akses dan pengaturan akun",
                primary: false,
            },
            {
                label: "Support Umum & Admin Sistem",
                email: "warosida06@gmail.com",
                description: "Untuk permintaan akses dan pengaturan akun",
                primary: false,
            },
            {
                label: "Technical Support",
                email: "pc.ardiman98@gmail.com",
                description:
                    "Developer - Untuk masalah teknis dan troubleshooting",
                primary: false,
            },
        ],
        phones: [
            {
                label: "Hotline Support",
                number: "+62 852-4154-2624",
                whatsapp: true,
                hours: "08:00 - 17:00 WIB",
                primary: true,
            },
        ],
        office: {
            address: "Universitas Muhammadiyah Kendari",
            street: "Jl. KH. Ahmad Dahlan No. 10",
            city: "Kendari, Sulawesi Tenggara 93117",
            hours: "Senin - Jumat: 08:00 - 16:00 WIB",
        },
    };

    const handleWhatsApp = (number: string) => {
        const cleanNumber = number.replace(/[^0-9]/g, "");
        const message = encodeURIComponent(
            "Halo, saya membutuhkan bantuan terkait Sistem Supervisi."
        );
        window.open(`https://wa.me/${cleanNumber}?text=${message}`, "_blank");
    };

    const handleEmail = (email: string, subject: string) => {
        const encodedSubject = encodeURIComponent(
            `[Sistem Supervisi] ${subject}`
        );
        window.open(`mailto:${email}?subject=${encodedSubject}`, "_blank");
    };

    return (
        <Guest>
            <Head title="Hubungi Kami" />
            <div className="min-h-screen bg-gradient-to-b from-blue-50 to-slate-50">
                <div className="container max-w-6xl mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Email Contacts */}
                        <div className="lg:col-span-2 space-y-6">
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center gap-2">
                                        <Mail className="h-5 w-5 text-blue-600" />
                                        <CardTitle>Kontak Email</CardTitle>
                                    </div>
                                    <CardDescription>
                                        Pilih email yang sesuai dengan kebutuhan
                                        Anda
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {contactInfo.emails.map(
                                        (contact, index) => (
                                            <div
                                                key={index}
                                                className="border rounded-lg p-4 hover:bg-slate-50 transition-colors"
                                            >
                                                <div className="flex items-start justify-between mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <h3 className="font-semibold text-slate-900">
                                                            {contact.label}
                                                        </h3>
                                                        {contact.primary && (
                                                            <Badge
                                                                variant="default"
                                                                className="bg-blue-100 text-blue-700"
                                                            >
                                                                Utama
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </div>
                                                <p className="text-sm text-slate-600 mb-3">
                                                    {contact.description}
                                                </p>
                                                <div className="flex items-center justify-between">
                                                    <code className="text-sm bg-slate-100 px-2 py-1 rounded font-mono">
                                                        {contact.email}
                                                    </code>
                                                    <Button
                                                        size="sm"
                                                        onClick={() =>
                                                            handleEmail(
                                                                contact.email,
                                                                contact.label
                                                            )
                                                        }
                                                        className="bg-blue-600 hover:bg-blue-700"
                                                    >
                                                        <Send className="h-4 w-4 mr-1" />
                                                        Kirim Email
                                                    </Button>
                                                </div>
                                            </div>
                                        )
                                    )}
                                </CardContent>
                            </Card>

                            {/* Phone Contacts */}
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center gap-2">
                                        <Phone className="h-5 w-5 text-green-600" />
                                        <CardTitle>Kontak Telepon</CardTitle>
                                    </div>
                                    <CardDescription>
                                        Hubungi kami langsung untuk bantuan
                                        cepat
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {contactInfo.phones.map(
                                        (contact, index) => (
                                            <div
                                                key={index}
                                                className="border rounded-lg p-4 hover:bg-slate-50 transition-colors"
                                            >
                                                <div className="flex items-start justify-between mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <h3 className="font-semibold text-slate-900">
                                                            {contact.label}
                                                        </h3>
                                                        {contact.primary && (
                                                            <Badge
                                                                variant="default"
                                                                className="bg-green-100 text-green-700"
                                                            >
                                                                Utama
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 mb-3">
                                                    <Clock className="h-4 w-4 text-slate-500" />
                                                    <span className="text-sm text-slate-600">
                                                        {contact.hours}
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <code className="text-sm bg-slate-100 px-2 py-1 rounded font-mono">
                                                        {contact.number}
                                                    </code>
                                                    <div className="flex gap-2">
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() =>
                                                                window.open(
                                                                    `tel:${contact.number}`,
                                                                    "_blank"
                                                                )
                                                            }
                                                        >
                                                            <Phone className="h-4 w-4 mr-1" />
                                                            Telepon
                                                        </Button>
                                                        {contact.whatsapp && (
                                                            <Button
                                                                size="sm"
                                                                onClick={() =>
                                                                    handleWhatsApp(
                                                                        contact.number
                                                                    )
                                                                }
                                                                className="bg-green-600 hover:bg-green-700"
                                                            >
                                                                <MessageCircle className="h-4 w-4 mr-1" />
                                                                WhatsApp
                                                            </Button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar Info */}
                        <div className="space-y-6">
                            {/* Office Info */}
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-5 w-5 text-orange-600" />
                                        <CardTitle>Kantor Kami</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div>
                                        <h4 className="font-semibold text-slate-900">
                                            {contactInfo.office.address}
                                        </h4>
                                        <p className="text-sm text-slate-600">
                                            {contactInfo.office.street}
                                        </p>
                                        <p className="text-sm text-slate-600">
                                            {contactInfo.office.city}
                                        </p>
                                    </div>
                                    <Separator />
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-slate-500" />
                                        <span className="text-sm text-slate-600">
                                            {contactInfo.office.hours}
                                        </span>
                                    </div>
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        onClick={() =>
                                            window.open(
                                                "https://maps.google.com?q=Universitas+Muhammadiyah+Kendari",
                                                "_blank"
                                            )
                                        }
                                    >
                                        <ExternalLink className="h-4 w-4 mr-2" />
                                        Lihat di Maps
                                    </Button>
                                </CardContent>
                            </Card>

                            {/* Quick Info */}
                            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                                <CardHeader>
                                    <div className="flex items-center gap-2">
                                        <Users className="h-5 w-5 text-blue-600" />
                                        <CardTitle className="text-blue-900">
                                            Tim Support
                                        </CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="text-sm text-blue-800">
                                        <p className="font-medium mb-2">
                                            Kami siap membantu dengan:
                                        </p>
                                        <ul className="space-y-1 list-disc list-inside ml-2">
                                            <li>Instalasi dan setup sistem</li>
                                            <li>Pelatihan penggunaan</li>
                                            <li>Troubleshooting masalah</li>
                                            <li>Permintaan fitur baru</li>
                                            <li>Konsultasi teknis</li>
                                        </ul>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </Guest>
    );
};

export default ContactPage;
