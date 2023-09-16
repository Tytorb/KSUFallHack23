from py3dbp import Packer, Bin, Item
from io import StringIO


def testing(container_data: object):
    output_buffer = StringIO()

    packer = Packer()
    packer.add_bin(
        Bin(
            container_data.name,
            container_data.width,
            container_data.height,
            container_data.depth,
            container_data.max_weight,
        )
    )

    packer.add_item(Item("NAPA Premium Brake Rotor", 3, 3, 3, 3))
    packer.add_item(Item("NAPA PROFORMER Beam Wiper Blade", 3, 3, 3, 3))
    packer.add_item(Item("NAPA The Legend Premium AGM Battery", 3, 3, 3, 3))

    packer.pack()
    for b in packer.bins:
        output_buffer.write(":::::::::::" + b.string() + "\n")

        output_buffer.write("FITTED ITEMS:\n")
        for item in b.items:
            output_buffer.write("====> " + item.string() + "\n")

        output_buffer.write("UNFITTED ITEMS:\n")
        for item in b.unfitted_items:
            output_buffer.write("====> " + item.string() + "\n")

        output_buffer.write("***************************************************\n")
        output_buffer.write("***************************************************\n")

    result_string = output_buffer.getvalue()

    output_buffer.close()
    print(result_string)

    return result_string
