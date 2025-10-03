import { Destination } from "../entities/destination.entity";
import { DataSource } from "typeorm";
import { AppDataSource } from "../../data-source";

async function seed() {
    await AppDataSource.initialize();
    const repo = AppDataSource.getRepository(Destination);

    const sample = [
        {
            name: 'Hạ Long Bay',
            description: 'Beautiful bay in Vietnam',
            imageURL: 'https://res.cloudinary.com/daprnsq8s/image/upload/v1757168099/photo-1697850084120-4896a446a04d_mbgnec.jpg',
            galleryURL: ['https://res.cloudinary.com/daprnsq8s/image/upload/v1757168057/photo-1643029891412-92f9a81a8c16_j0t9ni.jpg',
                'https://res.cloudinary.com/daprnsq8s/image/upload/v1757168099/photo-1697850084120-4896a446a04d_mbgnec.jpg',
                'https://res.cloudinary.com/daprnsq8s/image/upload/v1757207975/7ae2ff19933fb33a607da5a43c63b601_znjzzc.jpg',
                'https://res.cloudinary.com/daprnsq8s/image/upload/v1757208011/9466d1826e656a8db618a052640506fd_ygfgh6.jpg'
            ],
            isPopular: true,
        },
        {
            name: 'Hà Nội',
            description: 'Thủ đô ngàn năm văn hiến với Hồ Gươm, Lăng Bác, phố cổ.',
            imageURL: 'https://res.cloudinary.com/daprnsq8s/image/upload/v1757207413/premium_photo-1691960159290-6f4ace6e6c4c_pasmwv.jpg',
            galleryURL: ['https://res.cloudinary.com/daprnsq8s/image/upload/v1757207432/photo-1592028219310-0cb15923525a_xlhq6v.jpg',
                'https://res.cloudinary.com/daprnsq8s/image/upload/v1757207482/photo-1581350845039-3318c9bd4cac_zcd7g2.jpg',
                'https://res.cloudinary.com/daprnsq8s/image/upload/v1757207467/photo-1576513500959-4f29b3fed28f_ady8qd.jpg',
                'https://res.cloudinary.com/daprnsq8s/image/upload/v1757207589/73129356ebdc1b3ce1de937afb5f2d33_wtch1n.jpg'
            ],
            isPopular: true,
        },
        {
            name: 'Đà Nẵng',
            description: 'Thành phố đáng sống, nổi tiếng với biển Mỹ Khê và Bà Nà Hills.',
            imageURL: 'https://res.cloudinary.com/daprnsq8s/image/upload/v1757208617/dcbcd7dc651121d85dfb20f5e6b9e595_i8tmha.jpg',
            galleryURL: ['https://res.cloudinary.com/daprnsq8s/image/upload/v1757208623/fddb7c8a948bf70ed92206bfc74f5db3_phiyfl.jpg',
                'https://res.cloudinary.com/daprnsq8s/image/upload/v1757208557/dcbcd7dc651121d85dfb20f5e6b9e595_k7mpsi.jpg',
                'https://res.cloudinary.com/daprnsq8s/image/upload/v1757208191/photo-1693282815001-0471e68d3bc0_rrgyob.jpg',
                'https://res.cloudinary.com/daprnsq8s/image/upload/v1757208623/fddb7c8a948bf70ed92206bfc74f5db3_phiyfl.jpg'
            ],
            isPopular: true,
        },
        {
            name: 'Phú Quốc',
            description: 'Đảo ngọc với biển xanh và resort sang trọng.',
            imageURL: 'https://res.cloudinary.com/daprnsq8s/image/upload/v1757208872/4ad85d003df5018c084269085c82591d_uyci1g.jpg',
            galleryURL: ['https://res.cloudinary.com/daprnsq8s/image/upload/v1757209048/photo-1668570496303-e22d19a17f65_txz4md.jpg',
                'https://res.cloudinary.com/daprnsq8s/image/upload/v1757208952/35261ba9f77378affb68f0586df3a803_uhlooq.jpg',
                'https://res.cloudinary.com/daprnsq8s/image/upload/v1757209110/photo-1698809807960-758cf416e96e_dxiojd.jpg',
                'https://res.cloudinary.com/daprnsq8s/image/upload/v1757209272/phu-quoc-thumbs-min_ht8u11.jpg'
            ],
            isPopular: true,
        },
        {
            name: 'Hội An',
            description: 'Thành phố cổ kính với kiến trúc độc đáo và văn hóa phong phú.',
            imageURL: 'https://res.cloudinary.com/daprnsq8s/image/upload/v1757209345/66c3d7d7e2f16827b9b06a2d67fd01f2_qim8z3.jpg',
            galleryURL: ['https://res.cloudinary.com/daprnsq8s/image/upload/v1757209413/cfe4e29a8a1f1974b9538b312bcca025_ehrsoz.jpg',
                'https://res.cloudinary.com/daprnsq8s/image/upload/v1757209413/cfe4e29a8a1f1974b9538b312bcca025_ehrsoz.jpg',
                'https://res.cloudinary.com/daprnsq8s/image/upload/v1757209413/cfe4e29a8a1f1974b9538b312bcca025_ehrsoz.jpg',
                'https://res.cloudinary.com/daprnsq8s/image/upload/v1757209498/premium_photo-1690960644375-6f2399a08ebc_ttm68c.jpg'
            ],
            isPopular: true,
        },
        {
            name: 'Sa Pa',
            description: 'Thành phố mờ sương với những cánh đồng bậc thang tuyệt đẹp.',
            imageURL: 'https://res.cloudinary.com/daprnsq8s/image/upload/v1757209616/photo-1693474358354-f3d31c5c5af8_qifndi.jpg',
            galleryURL: ['https://res.cloudinary.com/daprnsq8s/image/upload/v1757209659/4c7d75aa74c79516ae36c3a288dd946e_wy4kx8.jpg',
                'https://res.cloudinary.com/daprnsq8s/image/upload/v1757209741/59a84a6467edb21cc6474281b1d4db6b_dmubqb.jpg',
                'https://i.pinimg.com/736x/3b/dd/15/3bdd158fc64e3036e5b33c4463132df0.jpg',
                'https://res.cloudinary.com/daprnsq8s/image/upload/v1757209822/24059c277abe50c4ddb7f314f4403b19_dbhm4y.jpg'
            ],
            isPopular: true,
        },
        {
            name: 'Đà Lạt',
            description: 'Thành phố ngàn hoa với khí hậu mát mẻ quanh năm.',
            imageURL: 'https://res.cloudinary.com/daprnsq8s/image/upload/v1757209952/7e92a3a332bb71af1ce2c9ded6cdfd1b_ldk6u8.jpg',
            galleryURL: ['https://res.cloudinary.com/daprnsq8s/image/upload/v1757210115/ccaab9802e1baae89e44329bc244bcbd_ijz9cq.jpg',
                'https://res.cloudinary.com/daprnsq8s/image/upload/v1757210581/3f304c51e360efe6d94162f684abfcb9_zw459m.jpg',
                'https://res.cloudinary.com/daprnsq8s/image/upload/v1757210658/99cdc316de86fd8e01686ef49d1f4d25_lromwc.jpg',
                'https://res.cloudinary.com/daprnsq8s/image/upload/v1757210720/ccaab9802e1baae89e44329bc244bcbd_zwuqxy.jpg'
            ],
            isPopular: true,
        },
        {
            name: 'Nha Trang',
            description: 'Thành phố biển với bãi cát trắng và nước biển trong xanh.',
            imageURL: 'https://res.cloudinary.com/daprnsq8s/image/upload/v1757211147/06ff69cd9e3eb69eb10a3d3caabf9808_rqun3b.jpg',
            galleryURL: ['https://res.cloudinary.com/daprnsq8s/image/upload/v1757211016/Nhatrang_ih4noh.jpg',
                'https://res.cloudinary.com/daprnsq8s/image/upload/v1757211003/dua_20sub_209th6_14_r3qz8a.jpg',
                'https://res.cloudinary.com/daprnsq8s/image/upload/v1757211200/tfd_241004024823_274817_Vin_20Wonder_20_2_rpxuva.jpg',
                'https://res.cloudinary.com/daprnsq8s/image/upload/v1757211212/tfd_241004030628_178508_I_20resort_20_1_eaglyf.jpg'
            ],
            isPopular: true,
        },
        {
            name: 'Quảng Bình',
            description: 'Thành phố biển với bãi cát trắng và nước biển trong xanh.',
            imageURL: 'https://res.cloudinary.com/daprnsq8s/image/upload/v1757211147/06ff69cd9e3eb69eb10a3d3caabf9808_rqun3b.jpg',
            galleryURL: ['https://res.cloudinary.com/daprnsq8s/image/upload/v1757211432/11f7af66933e6ab8c992573c283fd0ba_mbzo93.jpg',
                'https://res.cloudinary.com/daprnsq8s/image/upload/v1757211438/f98b47e3eef9ea3e69533e59f31ca911_apozhx.jpg',
                'https://res.cloudinary.com/daprnsq8s/image/upload/v1757211539/dc053ccf3e6edf3891c0b315264ad623_cgnzy0.jpg',
                'https://res.cloudinary.com/daprnsq8s/image/upload/v1757212283/efa81eec54ea51c660fcd86e71fce1b0_vdevfd.jpg'
            ],
            isPopular: true,
        },
    ]
    await repo.save(sample);
    console.log('✅ Seeded destinations!');
    await AppDataSource.destroy();
};
seed();