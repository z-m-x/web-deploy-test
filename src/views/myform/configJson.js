export const configJson = [
  {
    formKey: "form1",
    children: [
      {
        type: "el-input", //element中表单项标签名
        valueKey: "input", //在form中绑定的属性key,校验规则name需要一致
        props: {
          //使用该组件属性配置项
          placeholder: "我是默认值",
          clearable: true,
          class: "input-with-select",
        },
        "form-item": {
          //form-item属性配置项
          label: "输入框1",
          prop: "input", //校验规则的name和valuekey一致 ,一键重置也需要匹配此属性
          rules: [
            {
              //校验规则
              required: true,
              message: "必填",
              trigger: "blur",
            },
          ],
        },
        col: {
          span: 6, //栅格布局每个元素占多一行多宽，可不传默认6
        },
      },
      {
        type: "el-input",
        valueKey: "input2",
        props: {
          placeholder: "我是默认值",
          suffixIcon: "el-icon-delete",
        },
        "form-item": {
          label: "输入框2",
          prop: "input2",
        },
      },

      {
        type: "el-select",
        valueKey: "select1",
        // options: [
        //   {
        //     value: "1",
        //     label: "黄金糕",
        //   },
        //   {
        //     value: "2",
        //     label: "双皮奶",
        //   },
        //   {
        //     value: "3",
        //     label: "蚵仔煎",
        //   },
        // ],
        "form-item": {
          label: "下拉框1",
          prop: "select1",
          rules: [
            {
              required: true,
              message: "请至少选择一个活动性质",
              trigger: "change",
            },
          ],
        },
      },
      {
        type: "el-radio",
        valueKey: "radio1",
        "el-radio-button": true, //默认el-radio样式
        props: {},
        "form-item": {
          label: "单选框",
          prop: "radio1",
        },
        items: [
          {
            label: "ra1",
            name: "黄金糕",
          },
          {
            label: "ra2",
            name: "双皮奶",
          },
        ],
      },
      {
        type: "el-checkbox",
        valueKey: "checkbox1",
        props: {},
        "form-item": {
          label: "多选框",
          prop: "checkbox1",
        },
        items: [
          {
            label: "che1",
            name: "黄金糕",
          },
          {
            label: "che2",
            name: "双皮奶",
          },
        ],
      },
      {
        type: "el-input-number",
        valueKey: "inputnumber1",
        props: {
          min: 0,
          max: 10,
          step: 1,
        },
        "form-item": {
          label: "计数器",
          prop: "inputnumber1",
        },
      },
      {
        type: "el-cascader",
        valueKey: "cascader1",
        props: {
          props: {
            //懒加载
            lazy: true,
            lazyload: "lazyLoad",
          },
          options: [
            {
              value: "zhinan",
              label: "指南",
              children: [
                {
                  value: "shejiyuanze",
                  label: "设计原则",
                  children: [
                    {
                      value: "yizhi",
                      label: "一致",
                    },
                    {
                      value: "fankui",
                      label: "反馈",
                    },
                    {
                      value: "xiaolv",
                      label: "效率",
                    },
                    {
                      value: "kekong",
                      label: "可控",
                    },
                  ],
                },
              ],
            },
          ],
        },
        "form-item": {
          label: "级连选择器",
          prop: "cascader1",
        },
      },
      {
        type: "el-time-select",
        valueKey: "timeselect",
        props: {
          "picker-options": {
            start: "08:30",
            step: "00:15",
            end: "18:30",
          },
        },
        "form-item": {
          label: "时间选择",
          prop: "timeselect",
        },
      },
      {
        type: "el-date-picker",
        valueKey: "datepicker",
        props: {
          "value-format": "yyyy-MM-dd",
          type: "daterange",
          "range-separator": "至",
          "start-placeholder": "开始日期",
          "end-placeholder": "结束日期",
          "picker-options": {
            shortcuts: [
              {
                text: "最近一周",
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                  picker.$emit("pick", [start, end]);
                },
              },
              {
                text: "最近一个月",
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                  picker.$emit("pick", [start, end]);
                },
              },
              {
                text: "最近三个月",
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                  picker.$emit("pick", [start, end]);
                },
              },
            ],
          },
        },
        "form-item": {
          label: "日期选择器",
          prop: "datepicker",
        },
      },
      {
        type: "el-transfer",
        valueKey: "transfer",
        props: {
          data: [
            {
              key: 1,
              label: `备选项 ${1}`,
              disabled: 1 % 4 === 0,
            },
          ],
        },
        // 'render-content':'renderFunc',//自定义数据项，指定的方法名
        "form-item": {
          label: "穿梭框",
          prop: "transfer",
        },
        col: {
          span: 12,
        },
      },
      {
        type: "el-upload",
        valueKey: "elupload",
        props: {
          action: "#",
          "list-type": "picture-card",
          "auto-upload": false,
        },
        // 'render-content':'renderFunc',//自定义数据项，指定的方法名
        "form-item": {
          label: "上传",
          prop: "elupload",
        },
      },
    ],
  },
  {
    formKey: "form2",
    children: [
      {
        type: "el-radio",
        valueKey: "radio2",
        "el-radio-button": true, //默认el-radio样式
        props: {},
        "form-item": {
          label: "单选框",
          prop: "radio2",
          rules: [
            {
              //校验规则
              required: true,
              message: "必填",
              trigger: "change",
            },
          ],
        },
        items: [
          {
            label: "ra1",
            name: "黄金糕",
          },
          {
            label: "ra2",
            name: "双皮奶",
          },
        ],
      },
    ],
  },
];
