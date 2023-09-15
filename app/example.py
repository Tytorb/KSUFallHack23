from py3dbp import Packer, Bin, Item

packer = Packer()
# name, width, height, depth, weight
packer.add_bin(Bin("box-truck", 96, 96, 288, 312000))
packer.add_bin(Bin("shipping-container", 96, 102, 480, 710400))
packer.add_bin(Bin("storage-unit", 120, 96, 240, 1200000))

packer.add_item(Item("NAPA Premium Brake Rotor", 13, 2.19, 2, 26.4))
packer.add_item(Item("NAPA PROFORMER Beam Wiper Blade", 2.4, 25, 1.5, 0.5))
packer.add_item(Item("NAPA The Legend Premium AGM Battery", 11, 7.5, 7, 47.5))


packer.pack()

for b in packer.bins:
    print(":::::::::::", b.string())

    print("FITTED ITEMS:")
    for item in b.items:
        print("====> ", item.string())

    print("UNFITTED ITEMS:")
    for item in b.unfitted_items:
        print("====> ", item.string())

    print("***************************************************")
    print("***************************************************")
