# 快速排序
def quick_sort(data):
    """对列表执行快速排序，返回新列表。"""
    arr = list(data)  # 复制，避免修改原列表
    _quick_sort_helper(arr, 0, len(arr) - 1)
    return arr

def _quick_sort_helper(arr, low, high):
    """快速排序辅助函数"""
    if low < high:
        # 找到分区点
        pi = _partition(arr, low, high)

        # 递归排序左右两部分
        _quick_sort_helper(arr, low, pi - 1)
        _quick_sort_helper(arr, pi + 1, high)

def _partition(arr, low, high):
    """分区函数，选择最后一个元素作为基准"""
    pivot = arr[high]  # 基准
    i = low - 1  # 较小元素的索引

    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]

    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1


if __name__ == "__main__":
    nums = [5, 1, 4, 2, 8]
    print("原始：", nums)
    print("排序：", quick_sort(nums))

