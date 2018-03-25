export { BuildingsList }

let BuildingsList =
[
    {
        Name: "StonemasonIII",
        Income:
        {
            Name: "Stone",
            Income: 3
        },
        Price:
        [
            {
                Name: "Wood",
                Amount: 10
            }
        ],
        Structure: { X:3, Y:2, Fields:[0,1,1,1,1,0] },
        Foundations: { X:3, Y:2, Fields:[0,1,1,1,0,0] }
    },
    {
        Name: "SawmillI",
        Income:
        {
            Name: "Wood",
            Income: 1
        },
        Price:
        [
            {
                Name: "Wood",
                Amount: 5
            }
        ],
        Structure: { X:1, Y:2, Fields:[1,1] },
        Foundations: { X:1, Y:2, Fields:[1,1] }
    }
]