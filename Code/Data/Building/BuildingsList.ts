export { BuildingsList }

let BuildingsList =
[
    {
        Name: "SawmillI",
        Unitar: false,
        Income:
        {
            Name: "Wood",
            Income: 2
        },
        Price:
        [
            {
                Name: "Sand",
                Amount: 1
            }
        ],
        Structure: { X:1, Y:2, Fields:[1,1] },
        Foundations:
        [
            { X:1, Y:2, Fields:[1,0] },
            { X:1, Y:2, Fields:[0,1] }
        ]
    },
    {
        Name: "StonemasonI",
        Unitar: false,
        Income:
        {
            Name: "Stone",
            Income: 2
        },
        Price:
        [
            {
                Name: "Wood",
                Amount: 1
            }
        ],
        Structure: { X:2, Y:1, Fields:[1,1] },
        Foundations:
        [
            { X:2, Y:1, Fields:[1,0] },
            { X:2, Y:1, Fields:[0,1] }
        ]
    },
    {
        Name: "SandpitI",
        Unitar: false,
        Income:
        {
            Name: "Sand",
            Income: 2
        },
        Price:
        [
            {
                Name: "Stone",
                Amount: 1
            }
        ],
        Structure: { X:1, Y:2, Fields:[1,1] },
        Foundations:
        [
            { X:1, Y:2, Fields:[1,0] },
            { X:1, Y:2, Fields:[0,1] }
        ]
    },
    {
        Name: "SawmillII",
        Unitar: false,
        Income:
        {
            Name: "Wood",
            Income: 4
        },
        Price:
        [
            {
                Name: "Sand",
                Amount: 2
            }
        ],
        Structure: { X:1, Y:3, Fields:[1,1,1] },
        Foundations:
        [
            { X:1, Y:3, Fields:[0,1,0]  },
            { X:1, Y:3, Fields:[1,0,1]  },
            { X:1, Y:3, Fields:[1,1,0]  },
            { X:1, Y:3, Fields:[0,1,1]  }
        ]
    },
    {
        Name: "StonemasonII",
        Unitar: false,
        Income:
        {
            Name: "Stone",
            Income: 4
        },
        Price:
        [
            {
                Name: "Wood",
                Amount: 2
            }
        ],
        Structure: { X:2, Y:2, Fields:[1,1,1,0] },
        Foundations:
        [
            { X:2, Y:2, Fields:[1,0,0,0] },
            { X:2, Y:2, Fields:[0,1,1,0] }
        ]
    },
    {
        Name: "SandpitII",
        Unitar: false,
        Income:
        {
            Name: "Sand",
            Income: 4
        },
        Price:
        [
            {
                Name: "Stone",
                Amount: 2
            }
        ],
        Structure: { X:2, Y:2, Fields:[1,1,0,1] },
        Foundations:
        [
            { X:2, Y:2, Fields:[1,0,0,1] },
            { X:2, Y:2, Fields:[0,1,0,0] },
            { X:2, Y:2, Fields:[1,1,0,0] },
            { X:2, Y:2, Fields:[0,1,0,1] }        ]
    },
    {
        Name: "SawmillIII",
        Unitar: false,
        Income:
        {
            Name: "Wood",
            Income: 7
        },
        Price:
        [
            {
                Name: "Sand",
                Amount: 2
            },
            {
                Name: "Stone",
                Amount: 1
            }
        ],
        Structure: { X:2, Y:3, Fields:[0,1,1,1,0,1] },
        Foundations:
        [
            { X:2, Y:3, Fields:[0,0,0,1,0,0]  },
            { X:2, Y:3, Fields:[1,0,0,0,0,1]  },
        
        ]
    },
    {
        Name: "StonemasonIII",
        Unitar: false,
        Income:
        {
            Name: "Stone",
            Income: 7
        },
        Price:
        [
            {
                Name: "Wood",
                Amount: 2
            },
            {
                Name: "Sand",
                Amount: 1
            }
        ],
        Structure: { X:3, Y:2, Fields:[0,1,1,1,1,0] },
        Foundations:
        [
            { X:3, Y:2, Fields:[0,1,0,1,0,0] },
            { X:3, Y:2, Fields:[0,1,0,0,1,0] },
            { X:3, Y:2, Fields:[0,0,1,1,0,0] },
            { X:3, Y:2, Fields:[0,0,1,0,1,0] }

        ]
    },

    {
        Name: "SandpitIII",
        Unitar: false,
        Income:
        {
            Name: "Sand",
            Income: 7
        },
        Price:
        [
            {
                Name: "Stone",
                Amount: 2
            },
            {
                Name: "Wood",
                Amount: 1
            }
        ],
        Structure: { X:2, Y:2, Fields:[1,1,1,1] },
        Foundations:
        [
            { X:2, Y:2, Fields:[1,0,0,1] },
            { X:2, Y:2, Fields:[0,1,1,0] }
        ]
    },
   
       {
        Name: "MetalworksII",
        Unitar: false,
        Income:
        {
            Name: "Metal",
            Income: 1
        },
        Price:
        [
            {
                Name: "Stone",
                Amount: 2
            },
            {
                Name: "Wood",
                Amount: 1
            }
        ],
        Structure: { X:2, Y:2, Fields:[0,1,1,1] },
        Foundations: [
            { X:2, Y:2, Fields:[0,1,1,0] },
            { X:2, Y:2, Fields:[0,0,0,1] }
        ]
    },
    {
        Name: "MetalworksIII",
        Unitar: false,
        Income:
        {
            Name: "Metal",
            Income: 2
        },
        Price:
        [
            {
                Name: "Stone",
                Amount: 3
            },
            {
                Name: "Wood",
                Amount: 1
            }
        ],
        Structure: { X:3, Y:2, Fields:[0,0,1,1,1,1] },
        Foundations:[
             { X:3, Y:2, Fields:[0,0,1,0,0,1] },
             { X:3, Y:2, Fields:[0,0,1,0,1,0] },
             { X:3, Y:2, Fields:[0,0,1,1,0,0] }
        ]
    },
    {
        Name: "GlassworksII",
        Unitar: false,
        Income:
        {
            Name: "Glass",
            Income: 1
        },
        Price:
        [
            {
                Name: "Sand",
                Amount: 2
            },
            {
                Name: "Wood",
                Amount: 1
            }
        ],
        Structure: { X:3, Y:1, Fields:[1,1,1] },
        Foundations: [
            { X:3, Y:1, Fields:[0,1,0] },
            { X:3, Y:1, Fields:[1,0,1] },
            { X:3, Y:1, Fields:[1,1,0] },
            { X:3, Y:1, Fields:[0,1,1] }
        ]
    },
    {
        Name: "GlassworksIII",
        Unitar: false,
        Income:
        {
            Name: "Glass",
            Income: 2
        },
        Price:
        [
            {
                Name: "Stone",
                Amount: 1
            },
            {
                Name: "Sand",
                Amount: 2
            },
            {
                Name: "Wood",
                Amount: 1
            }
        ],
        Structure: { X:3, Y:2, Fields:[1,1,1,0,0,1] },
        Foundations:
        [
            { X:3, Y:2, Fields:[0,1,1,0,0,0] },
            { X:3, Y:2, Fields:[0,0,1,0,0,1] },
            { X:3, Y:2, Fields:[1,0,1,0,0,0] },
            { X:3, Y:2, Fields:[1,0,0,0,0,1] }
        ]
    },
    {
        Name: "ConcretoriumII",
        Unitar: false,
        Income:
        {
            Name: "Concrete",
            Income: 1
        },
        Price:
        [
            {
                Name: "Stone",
                Amount: 2
            },
            {
                Name: "Wood",
                Amount: 1
            }
        ],
        Structure: { X:2, Y:2, Fields:[1,1,1,0] },
        Foundations:
        [
            { X:2, Y:2, Fields:[1,0,0,0] },
            { X:2, Y:2, Fields:[0,1,1,0] }
        ]
    },
    {
        Name: "ConcretoriumIII",
        Unitar: false,
        Income:
        {
            Name: "Concrete",
            Income: 2
        },
        Price:
        [
            {
                Name: "Stone",
                Amount: 2
            },
            {
                Name: "Wood",
                Amount: 1
            },
            {
                Name: "Sand",
                Amount: 1
            }
        ],
        Structure: { X:2, Y:3, Fields:[0,1,1,1,1,0] },
        Foundations:
        [
            { X:2, Y:3, Fields:[0,1,0,1,0,0] },
            { X:2, Y:3, Fields:[0,1,0,0,1,0] },
            { X:2, Y:3, Fields:[0,0,1,1,0,0] },
            { X:2, Y:3, Fields:[0,0,1,0,1,0] }

        ]
    },
    {
        Name: "JewelryIV",
        Unitar: false,
        Income:
        {
            Name: "Jewel",
            Income: 1
        },
        Price:
        [
            {
                Name: "Glass",
                Amount: 3
            },
            {
                Name: "Sand",
                Amount: 2
            },
            {
                Name: "Metal",
                Amount: 1
            }

        ],
        Structure: { X:3, Y:3, Fields:[0,1,0,1,1,1,0,0,1] },
        Foundations:[
            { X:3, Y:3, Fields:[0,0,0,0,1,0,0,0,0] }
        
        ]
    },
    {
        Name: "MarblequarryIV",
        Unitar: false,
        Income:
        {
            Name: "Marble",
            Income: 1
        },
        Price:
        [
            {
                Name: "Concrete",
                Amount: 2
            },
            {
                Name: "Stone",
                Amount: 3
            }

        ],
        Structure: { X:3, Y:3, Fields:[1,0,0,1,0,0,1,1,1] },
        Foundations:[
            { X:3, Y:3, Fields:[1,0,0,0,0,0,1,0,1] },
            { X:3, Y:3, Fields:[0,0,0,1,0,0,0,1,0] }
        ]
    },
    {
        Name: "GoldsmithIV",
        Unitar: false,
        Income:
        {
            Name: "Gold",
            Income: 1
        },
        Price:
        [
            {
                Name: "Metal",
                Amount: 3
            },
            {
                Name: "Stone",
                Amount: 2
            }

        ],
        Structure: { X:3, Y:2, Fields:[1,1,1,0,1,1] },
        Foundations:[
            { X:3, Y:2, Fields:[0,1,0,0,1,0] },
            { X:3, Y:2, Fields:[1,0,0,0,0,1] },
            { X:3, Y:2, Fields:[0,1,0,0,1,0] },
            { X:3, Y:2, Fields:[1,0,0,0,1,0] }
        ]
    },
    {
        Name: "Pyramid",
        Unitar: true,
        Income:
        {
            Name: "Jewel",
            Income: 10
        },
        Price:
        [
            {
                Name: "Marble",
                Amount: 10
            },
            {
                Name: "Jewel",
                Amount: 10
            },
            {
                Name: "Gold",
                Amount: 10
            }

        ],
        Structure: { X:4, Y:4, Fields: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1] },
        Foundations:[
            { X:4, Y:4, Fields: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1] }
        ]
    }
]