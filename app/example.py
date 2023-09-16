from py3dbp import Packer, Bin, Item
from io import StringIO
from typing import List


class PackingResult:
    def __init__(self):
        self.bins = []

    def add_bin(
        self, bin_name, width, height, depth, max_weight, fitted_items, unfitted_items
    ):
        self.bins.append(
            {
                "name": bin_name,
                "width": width,
                "height": height,
                "depth": depth,
                "max_weight": max_weight,
                "fitted_items": fitted_items,
                "unfitted_items": unfitted_items,
            }
        )


def testing(container_data: object, item_data: List[object]) -> PackingResult:
    packing_result = PackingResult()

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

    for i in item_data:
        item = Item(
            i.name,
            i.width,
            i.height,
            i.depth,
            i.weight,
        )
        # Set the rotation type based on input
        packer.add_item(item)

    packer.pack()
    for b in packer.bins:
        bin_name = b.name
        bin_width = b.width
        bin_height = b.height
        bin_depth = b.depth
        bin_max_weight = b.max_weight
        fitted_items = [
            {
                "name": item.name,
                "width": item.get_dimension()[0],  # Use calculated dimensions
                "height": item.get_dimension()[1],
                "depth": item.get_dimension()[2],
                "weight": item.weight,
                "pos": item.position,
                "rot": item.rotation_type,
            }
            for item in b.items
        ]
        unfitted_items = [
            {
                "name": item.name,
                "width": item.width,
                "height": item.height,
                "depth": item.depth,
                "weight": item.weight,
            }
            for item in b.unfitted_items
        ]

        packing_result.add_bin(
            bin_name,
            bin_width,
            bin_height,
            bin_depth,
            bin_max_weight,
            fitted_items,
            unfitted_items,
        )

    return packing_result
