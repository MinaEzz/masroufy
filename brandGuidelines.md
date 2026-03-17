# Brand Guidelines - مصروفي (Masroufy)

## Vision
تحويل عملية إدارة الأموال من عبء يومي إلى تجربة بصرية ممتعة وذكية، مع التركيز على السرعة والدقة في التنفيذ.

## Visual Identity (Pure Dark UI Focus)
بالرغم من دعم النظام للتبديل بين الأنماط، إلا أن التصميم مبني أساساً ليعطي أفضل تجربة في الـ Dark Mode.

- **Theme**: Pure Dark Mode (with Light Mode Support)
- **Primary Color**: #10b981 (Emerald Green) - يرمز للمال والنمو.
- **Background**: #020617 (Midnight Dark)
- **Surface/Cards**: #0f172a (Deep Navy)
- **Border/Dividers**: #1e293b
- **Typography**: 
  - Main Font: Inter (للأرقام الإنجليزية والـ UI)
  - Arabic Font: Cairo (للخط العربي الأصيل)
  - Headings: #f8fafc (Ghost White)
  - Body: #94a3b8 (Slate Gray)


### Typography
- **Primary Font**: `Inter` أو `Geist Sans` (للمحتوى الإنجليزي والأرقام).
- **Arabic Font**: `Cairo` (لضمان تناسق الخط العربي مع الهوية العصرية).
- **Headings**: `#fafafa` (White)
- **Body Text**: `#a1a1aa` (Muted Gray)

## Theme Switcher
- الزرار هيكون في الـ Header (Icon لشمس/قمر).
- الـ Light Mode هيتحول لدرجات الـ Slate-50 والـ White عشان يفضل مريح للعين الصبح.

## UI Style & Components
- **Framework**: `shadcn/ui` (مبني على Radix UI).
- **Radius**: `0.75rem` (زوايا مستديرة ناعمة تعطي انطباعاً بالمرونة).
- **Shadows**: إضافة توهج خارجي خفيف (Subtle Glow) للأزرار الأساسية باستخدام اللون البرتقالي بشفافية منخفضة.
- **Animations**: استخدام `Framer Motion` لعمل حركات دخول سلسة للجداول (Transactions List) وتأثيرات بصرية عند تحديث الرصيد.

## Financial Status Colors (Semantic)
بعيداً عن ألوان الهوية، نستخدم الألوان المعيارية للعمليات:
- **Success/Income**: `#10b981` (Emerald Green).
- **Danger/Expense**: `#ef4444` (Red).
- **Warning/Credit**: `#f59e0b` (Amber).