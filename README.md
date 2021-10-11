oninput similar onchange, but the difference is oninput act immediately whill onchange occurs when element being focus

1. Hạn chế tối đa các bài hát bị lặp lại => OK
2. Fix lỗi khi tua bài hát, click giữ một chút sẽ thấy lỗi, vì event updatetime nó liên tục chạy dẫn tới lỗi
3. Fix lỗi khi next tới 1-3 bài đầu danh sách thì không “scroll into view” => Ok
4. Lưu lại vị trí bài hát đang nghe, F5 lại ứng dụng không bị quay trở về bài đầu tiên 
5. Thêm chức năng điều chỉnh âm lượng, lưu vị trí âm lượng người dùng đã chọn. Mặc định 100 => OK

---------------------------------------------------------------------------
const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
    duration: 10000, // 10 seconds
    iterations: Infinity
});
cdThumbAnimate.pause();