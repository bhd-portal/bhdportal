import React, { Component } from "react";
import EditableNav from "./EditableNav";
import Admin_Doc_EditableTable from "./Admin_Doc_EditableTable";

class Admin_Documents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [
        {
          _id: "1",
          name: "בטיחות",
          documents: [
            {
              _id: "1",
              name: "Anna Doe",
              iconName: "chess-pawn",
              href: "/ab_guidance/chapter_1/מסמכים בבינה מלאכותית2.docx"
            },
            {
              _id: "2",
              name: "Anna Doe",
              iconName: "chess-pawn",
              href: "/ab_guidance/chapter_1/מסמכים בבינה מלאכותית2.docx"
            },
            {
              _id: "3",
              name: "Anna Doe",
              iconName: "chess-pawn",
              href: "/ab_guidance/chapter_1/מסמכים בבינה מלאכותית2.docx"
            },
            {
              _id: "4",
              name: "Anna Doe",
              iconName: "chess-pawn",
              href: "/ab_guidance/chapter_1/מסמכים בבינה מלאכותית2.docx"
            },
            {
              _id: "5",
              name: "Anna Doe",
              iconName: "chess-pawn",
              href: "/ab_guidance/chapter_1/מסמכים בבינה מלאכותית2.docx"
            }
          ]
        },
        {
          _id: "2",
          name: "דת",
          documents: [
            {
              _id: "1",
              name: "Anna Doe",
              iconName: "chess-pawn",
              href: "/ab_guidance/chapter_1/מסמכים בבינה מלאכותית2.docx"
            },
            {
              _id: "2",
              name: "Anna Doe",
              iconName: "chess-pawn",
              href: "/ab_guidance/chapter_1/מסמכים בבינה מלאכותית2.docx"
            },
            {
              _id: "3",
              name: "Anna Doe",
              iconName: "chess-pawn",
              href: "/ab_guidance/chapter_1/מסמכים בבינה מלאכותית2.docx"
            },
            {
              _id: "4",
              name: "Anna Doe",
              iconName: "chess-pawn",
              href: "/ab_guidance/chapter_1/מסמכים בבינה מלאכותית2.docx"
            },
            {
              _id: "5",
              name: "Anna Doe",
              iconName: "chess-pawn",
              href: "/ab_guidance/chapter_1/מסמכים בבינה מלאכותית2.docx"
            }
          ]
        },
        {
          _id: "3",
          name: 'ת"ש',
          documents: [
            {
              _id: "1",
              name: "Anna Doe",
              iconName: "chess-pawn",
              href: "/ab_guidance/chapter_1/מסמכים בבינה מלאכותית2.docx"
            },
            {
              _id: "2",
              name: "Anna Doe",
              iconName: "chess-pawn",
              href: "/ab_guidance/chapter_1/מסמכים בבינה מלאכותית2.docx"
            },
            {
              _id: "3",
              name: "Anna Doe",
              iconName: "chess-pawn",
              href: "/ab_guidance/chapter_1/מסמכים בבינה מלאכותית2.docx"
            },
            {
              _id: "4",
              name: "Anna Doe",
              iconName: "chess-pawn",
              href: "/ab_guidance/chapter_1/מסמכים בבינה מלאכותית2.docx"
            },
            {
              _id: "5",
              name: "Anna Doe",
              iconName: "chess-pawn",
              href: "/ab_guidance/chapter_1/מסמכים בבינה מלאכותית2.docx"
            }
          ]
        },
        {
          _id: "4",
          name: "שלישות",
          documents: [
            {
              _id: "1",
              name: "Anna Doe",
              iconName: "chess-pawn",
              href: "/ab_guidance/chapter_1/מסמכים בבינה מלאכותית2.docx"
            },
            {
              _id: "2",
              name: "Anna Doe",
              iconName: "chess-pawn",
              href: "/ab_guidance/chapter_1/מסמכים בבינה מלאכותית2.docx"
            },
            {
              _id: "3",
              name: "Anna Doe",
              iconName: "chess-pawn",
              href: "/ab_guidance/chapter_1/מסמכים בבינה מלאכותית2.docx"
            },
            {
              _id: "4",
              name: "Anna Doe",
              iconName: "chess-pawn",
              href: "/ab_guidance/chapter_1/מסמכים בבינה מלאכותית2.docx"
            },
            {
              _id: "5",
              name: "Anna Doe",
              iconName: "chess-pawn",
              href: "/ab_guidance/chapter_1/מסמכים בבינה מלאכותית2.docx"
            }
          ]
        },
        {
          _id: "5",
          name: "בטחון מידע",
          documents: [
            {
              _id: "1",
              name: "Anna Doe",
              iconName: "chess-pawn",
              href: "/ab_guidance/chapter_1/מסמכים בבינה מלאכותית2.docx"
            },
            {
              _id: "2",
              name: "Anna Doe",
              iconName: "chess-pawn",
              href: "/ab_guidance/chapter_1/מסמכים בבינה מלאכותית2.docx"
            },
            {
              _id: "3",
              name: "Anna Doe",
              iconName: "chess-pawn",
              href: "/ab_guidance/chapter_1/מסמכים בבינה מלאכותית2.docx"
            },
            {
              _id: "4",
              name: "Anna Doe",
              iconName: "chess-pawn",
              href: "/ab_guidance/chapter_1/מסמכים בבינה מלאכותית2.docx"
            },
            {
              _id: "5",
              name: "Anna Doe",
              iconName: "chess-pawn",
              href: "/ab_guidance/chapter_1/מסמכים בבינה מלאכותית2.docx"
            }
          ]
        }
      ]
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <React.Fragment>
        <h1 className="h1-title mb-4 text-center">ניהול מסמכים נפוצים</h1>
        <EditableNav
          categories={this.state.categories}
          render={(parent_index, item) => (
            <Admin_Doc_EditableTable category_index={parent_index} {...item} />
          )}
        />
      </React.Fragment>
    );
  }
}
export default Admin_Documents;
