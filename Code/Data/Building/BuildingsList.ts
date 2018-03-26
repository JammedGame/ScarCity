export { BuildingsList }

let BuildingsList =
[
    /* {
        Name: "Pyramid",
        Income:
        {
            Name: "Diamond",
            Income: 1
        },
        Price:
        [
            {
                Name: "Marble",
                Amount: 10
            },
            {
                Name: "Diamond",
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
    },
    */
   {
    Name: "SawmillI",
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
    }
    
   

   
   
   
    
]