const { fakerEN } = require('@faker-js/faker')

const getRandomArrayValue = arr => arr[Math.floor(Math.random() * arr.length)]

const collections = ['street', 'black', 'casual', 'orange', 'white']
const colors = ['purpure', 'yellow', 'orange', 'black', 'white']
const compositions = ['cotton', 'synthetics', 'polyester']
const accessoryTypes = ['bags', 'headdress', 'umbrella']

const images = [
	'/img/accessories/accessories-bags-1.png',
	'/img/accessories/accessories-bags-2.png',
	'/img/accessories/accessories-bags-3.png',
	'/img/accessories/accessories-bags-4.png',
	'/img/accessories/accessories-headdress.png',
	'/img/accessories/accessories-umbrella.png',
]

const wearingMethod = ['in hand', 'on shoulder', 'over shoulder']
const textures = ['nubuck', 'nappa', 'suede', 'naplak']
const styles = ['bucket bag', 'retro style', 'sports', 'travel']
const seasons = ['demi-season', 'all season']
const numbersOfSpokes = [9, 8, 10, 12, 7]
const spokeMaterials = ['metal', 'plastic', 'fiberglass']
const foldedLengths = [30, 40, 50, 60]
const mechanisms = ['manual', 'automatic']

module.exports = {
	async up(db) {
		return db.collection('accessories').insertMany(
			[...Array(50)].map(() => {
				const type =
					accessoryTypes[Math.floor(Math.random() * accessoryTypes.length)]

				const characteristics = [
					{
						type: 'bags',
						color: getRandomArrayValue(colors),
						composition: getRandomArrayValue(compositions),
						collection: getRandomArrayValue(collections),
						wearingMethod: getRandomArrayValue(wearingMethod),
						texture: getRandomArrayValue(textures),
						style: getRandomArrayValue(styles),
					},
					{
						type: 'headdress',
						color: getRandomArrayValue(colors),
						composition: getRandomArrayValue(compositions),
						season: getRandomArrayValue(seasons),
					},
					{
						type: 'umbrella',
						color: getRandomArrayValue(colors),
						composition: getRandomArrayValue(compositions),
						numberOfSpokes: getRandomArrayValue(numbersOfSpokes),
						spokeMaterial: getRandomArrayValue(spokeMaterials),
						foldedLength: getRandomArrayValue(foldedLengths),
						mechanism: getRandomArrayValue(mechanisms),
					},
				]

				let price = fakerEN.string.numeric({
					length: { min: 2, max: 3 },
					allowLeadingZeros: false,
				})

				price =
					price.length === 3
						? '1' + price.substring(1)
						: price.replace(/.{0,1}$/, 0)

				return {
					category: 'accessories',
					type,
					price: +price,
					name: fakerEN.lorem.sentence(2),
					description: fakerEN.lorem.sentences(10),
					characteristics: characteristics.find(item => item.type === type),
					images: images.filter(item => item.includes(type)),
					vendorCode: fakerEN.string.numeric(4),
					inStock: fakerEN.string.numeric(2),
					isBestseller: fakerEN.datatype.boolean(),
					isNew: fakerEN.datatype.boolean(),
					popularity: +fakerEN.string.numeric(3),
					sizes:
						type === 'umbrella'
							? {}
							: {
									s: fakerEN.datatype.boolean(),
									l: fakerEN.datatype.boolean(),
									m: fakerEN.datatype.boolean(),
									xl: fakerEN.datatype.boolean(),
									xxl: fakerEN.datatype.boolean(),
								},
				}
			})
		)
	},

	async down(db) {
		return db.collection('accessories').updateMany([])
	},
}
