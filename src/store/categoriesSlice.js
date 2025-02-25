import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// Ví dụ: tạo async thunk để gọi API lấy categories
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    // Giả lập API call, thay bằng URL thật nếu có
    // const response = await axios.get('/api/categories');
    // return response.data;
    
    // Hoặc tạo dữ liệu mẫu (ví dụ: 30 categories)
    const data = {};
    for (let i = 1; i <= 30; i++) {
      const categoryName = `Category ${i.toString().padStart(2, '0')}`;
      data[categoryName] = [];
      // Mỗi category có 10 document mẫu
      for (let j = 1; j <= 10; j++) {
        data[categoryName].push({
            id: j,
            name: `${categoryName} - Item ${j.toString().padStart(2, '0')}`,
            content: generateRandomContent()
        });
      }
    }
    // Mô phỏng độ trễ API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, 500);
    });
  }
);

const generateRandomContent = () => {
  const html = `<h2 id="introduction">Introduction</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum auctor mauris ut nunc fermentum, sed malesuada risus efficitur.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum auctor mauris ut nunc fermentum, sed malesuada risus efficitur.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum auctor mauris ut nunc fermentum, sed malesuada risus efficitur.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum auctor mauris ut nunc fermentum, sed malesuada risus efficitur.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum auctor mauris ut nunc fermentum, sed malesuada risus efficitur.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum auctor mauris ut nunc fermentum, sed malesuada risus efficitur.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum auctor mauris ut nunc fermentum, sed malesuada risus efficitur.</p><h2 id="overview">Overview</h2><p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.</p><p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.</p><p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.</p><p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.</p><p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.</p><p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.</p><h3 id="background">Background</h3><p>Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.</p><h2 id="main-content">Main Content</h2><p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores.</p><h3 id="analysis">Analysis</h3><p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.</p><h2 id="conclusion">Conclusion</h2><p>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?</p>`
  return html
    // const loremIpsum =
    //   "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum auctor nisl in dolor elementum, eget scelerisque magna luctus. Suspendisse potenti. Nullam a ullamcorper leo, id sodales orci. Proin vitae libero vel odio fermentum tristique. Sed euismod, ex ut laoreet gravida, nulla orci fringilla sapien, vitae lobortis eros magna et augue. Mauris aliquet.";
    // return loremIpsum.substring(0, 500);
}

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    data: {},
    loading: false,
    error: null,
  },
  reducers: {
    // Nếu cần action thủ công để set data
    setCategories: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;
