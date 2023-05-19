# 2023-05-19 15:44:54

goods 接口返回的内容分析：

- 初步判定未使用的字段：

  - is_add:1
  - sell_time_status
  - imageArr
  - membership_price: 0,
  - pack_cost: '0.00'
  - is_sell: true,
  - imageArr 为数组，images 为字符串；两者只是尺寸不同
  - 使用不在代码中体现
    - use_spec 有两个为 true，使用不在代码中体现
    - specs 同样也是
    - entity 同样也是（但应该是重要的）
    - imageArr 使用不在代码中体现
    - sell_time_status 使用不在代码中体现
    - sales 使用不在代码中体现
    - goods_meals_info 使用不在代码中体现
    - stall_code 使用不在代码中体现
    - unit_type 使用不在代码中体现
    - min_buy_num
    - is_follow_suit
    - cover_img
    - is_label
    - is_show_backstage 在 goods 和 packages 总配置了但都未使用
    - stock 库存，未体现使用，反而另外一个 points_stock 的才有用到 goods_stock

- 数据内容单一的字段：

  - goods_type: 1 或者 2,
  - unit 单位 件

- 目前来看，点单页面的商品信息主要使用以下字段。同时判断 specs 、 property 和 entity 只使用了其中一个
  - id
  - sort
  - name
  - icon
  - goods_list
    - id
    - sort
    - name
    - content
    - price
    - images
    - use_property
    - property
      -
