"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   category_issue_name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "CategoryIssues",
      [
        {
          category_issue_name: "Hư hỏng động cơ",
          category_issue_description: "Động cơ không hoạt động đúng cách",
          category_issue_solution: "Kiểm tra và sửa chữa động cơ",
          category_issue_level: "Nghiêm trọng",

          createdAt: new Date("2023-05-15T08:30:00"),
          shop_id: 1,
        },
        {
          category_issue_name: "Lỗi hệ thống điện",
          category_issue_description: "Đèn xe không sáng",
          category_issue_solution:
            "Kiểm tra dây điện và thay thế nếu cần thiết",
          category_issue_level: "Trung bình",

          createdAt: new Date("2023-05-16T09:00:00"),
          shop_id: 2,
        },
        {
          category_issue_name: "Lốp xe bị mòn",
          category_issue_description: "Lốp xe cần được thay mới",
          category_issue_solution: "Thay lốp xe mới",
          category_issue_level: "Nhẹ",

          createdAt: new Date("2023-05-17T10:15:00"),
          shop_id: 1,
        },
        {
          category_issue_name: "Phanh không ăn",
          category_issue_description: "Phanh không hoạt động tốt",
          category_issue_solution: "Kiểm tra và thay thế bộ phanh",
          category_issue_level: "Nghiêm trọng",

          createdAt: new Date("2023-05-18T11:00:00"),
          shop_id: 2,
        },
        {
          category_issue_name: "Bình ắc quy hết điện",
          category_issue_description: "Xe không thể khởi động",
          category_issue_solution: "Sạc hoặc thay thế bình ắc quy",
          category_issue_level: "Trung bình",

          createdAt: new Date("2023-05-19T12:45:00"),
          shop_id: 2,
        },
        {
          category_issue_name: "Vấn đề với bộ truyền động",
          category_issue_description: "Xe không chuyển số mượt mà",
          category_issue_solution: "Kiểm tra và bảo dưỡng bộ truyền động",
          category_issue_level: "Nghiêm trọng",

          createdAt: new Date("2023-05-20T14:20:00"),
          shop_id: 1,
        },
        {
          category_issue_name: "Gương chiếu hậu vỡ",
          category_issue_description: "Gương bị vỡ cần thay mới",
          category_issue_solution: "Thay gương mới",
          category_issue_level: "Nhẹ",

          createdAt: new Date("2023-05-21T15:55:00"),
          shop_id: 2,
        },
        {
          category_issue_name: "Hệ thống treo hỏng",
          category_issue_description: "Xe rung lắc mạnh khi đi qua ổ gà",
          category_issue_solution: "Kiểm tra và thay thế hệ thống treo",
          category_issue_level: "Nghiêm trọng",
          createdAt: new Date("2023-05-22T16:30:00"),
          shop_id: 2,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("CategoryIssues", null, {});
  },
};
