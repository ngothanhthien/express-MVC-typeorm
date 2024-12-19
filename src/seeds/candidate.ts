import { getRepository } from '@/models/Candidate'

async function seed() {
    const repository = getRepository()
    if (await repository.count()) {
        console.log('Candidate table has data')
        await repository.clear()
        console.log('Candidate table cleared')
    }

    await repository.insert([
        {
            name: "Nguyễn Thanh Nga",
            image: "/img/1.png",
        },
        {
            name: "Hoàng Thị Hải Yến",
            image: "/img/3.png",
        },
        {
            name: "Đỗ Thu Trang",
            image: "/img/5.png",
        },
        {
            name: "Nguyễn Phương Hoa",
            image: "/img/6.png",
        },
        {
            name: "Cao Thị Hạnh",
            image: "/img/7.png",
        }
    ])

    console.log('Candidate table seeded')
}

export {
    seed as candidateSeed
}
